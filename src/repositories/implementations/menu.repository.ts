
import menuItemModel, { MenuItemInterface } from '../../models/menu.model';
import { IMenuRepository } from '../interfaces/menu.repository.interface';
import { MenuItemDTO } from '../../dto/menu/menu-item.dto';

export default class MenuRepository implements IMenuRepository {
    async createMenuItem(data: MenuItemDTO): Promise<MenuItemInterface> {
        const existingItem = await menuItemModel.findOne({
            name: data.name,
            restaurantId: data.restaurantId,
        });

        if (existingItem) {
            throw new Error('Menu item already exists');
        }

        const createdItem = new menuItemModel({
            ...data,
        });

        return await createdItem.save();
    }

    async getAllVariants(restaurantId: string): Promise<any[] | { error: string }> {
        try {
            const menuItems = await menuItemModel.find({ restaurantId });
            const allVariants = menuItems.flatMap((item) => item.variants || []);
            return allVariants;
        } catch (error) {
            console.log('Error on get all variants in the menuRepo');
            return { error: (error as Error).message };
        }
    }

    async getAllMenuData(restaurantId: string): Promise<MenuItemInterface[] | { error: string }> {
        try {
            const getAllMenuItems = await menuItemModel.find({ restaurantId });
            return getAllMenuItems;
        } catch (error) {
            console.log('Error on get all menus in the menuRepo');
            return { error: (error as Error).message };
        }
    }

    async getSpecificMenuData(menuItemId: string): Promise<MenuItemInterface | { error: string; status: number }> {
        try {
            const getSpecificMenu = await menuItemModel.findById(menuItemId);
            if (!getSpecificMenu) {
                return { error: 'Menu item not found', status: 404 };
            }
            return getSpecificMenu;
        } catch (error) {
            console.log('Error in getSpecificMenuData:', error);
            return { error: (error as Error).message, status: 500 };
        }
    }

    async editMenuItems(data: MenuItemDTO): Promise<MenuItemInterface> {
        try {
            // console.log('dsta is getting on :',data);
            
            const updated = await menuItemModel.findByIdAndUpdate(
                data.restaurantId,
                {
                    $set: {
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        price: data.price,
                        quantity: data.quantity,
                        images: data.images,
                        hasVariants: data.hasVariants,
                        variants: data.variants,
                        timing: data.timing,
                    },
                },
                { new: true }
            );

            if (!updated) {
                throw new Error('Menu item not found');
            }
            // console.log('updated menu repo side :', updated);

            return updated;
        } catch (error) {

            console.log('Error on edit menu side',error);
            throw new Error((error as Error).message);
        }
    }

    async softDeleteMenu(menuItemId: string): Promise<MenuItemInterface | { message: string }> {
        try {
            const menuItem = await menuItemModel.findById(menuItemId);
            if (!menuItem) {
                return { message: 'Menu item not found' };
            }

            const updatedMenuItem = await menuItemModel.findByIdAndUpdate(
                menuItemId,
                { $set: { isActive: !menuItem.isActive } },
                { new: true }
            );

            return updatedMenuItem!;
        } catch (error) {
            console.log('Error on delete menu side');
            throw new Error((error as Error).message);
        }
    }

    async getRestaurantMenus(data: any): Promise<any[]> {
        try {
            const restaurantDetails = await menuItemModel.aggregate([
                { $match: { isActive: true } },
                {
                    $lookup: {
                        from: 'restaurants',
                        localField: 'restaurantId',
                        foreignField: '_id',
                        as: 'restaurant',
                    },
                },
                { $unwind: '$restaurant' },
                {
                    $project: {
                        _id: 1,
                        restaurantId: 1,
                        restaurantName: '$restaurant.restaurantName',
                        isOnline: '$restaurant.isOnline',
                        name: 1,
                        description: 1,
                        category: 1,
                        price: 1,
                        quantity: 1,
                        images: 1,
                        hasVariants: 1,
                        variants: 1,
                        timing: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        isActive: 1,
                    },
                },
            ]);
            return restaurantDetails;
        } catch (error) {
            console.log('Error on get all restaurant menu side');
            throw new Error((error as Error).message);
        }
    }

    async sortAllMenu(params: { sortValue: string; searchTerm: string; category: string }): Promise<any[]> {
        try {
            const { sortValue, searchTerm, category } = params;
            const matchStage: any = { isActive: true };
            if (searchTerm) {
                matchStage.name = { $regex: searchTerm, $options: 'i' };
            }
            if (category && category !== 'All') {
                matchStage.category = category;
            }
            const timingOrder = {
                morning: 1,
                afternoon: 2,
                evening: 3,
                daily: 4,
            };
            let sortStage: any = {};
            switch (sortValue) {
                case 'rating':
                    sortStage = { rating: -1 };
                    break;
                case 'priceLowToHigh':
                    sortStage = { price: 1 };
                    break;
                case 'priceHighToLow':
                    sortStage = { price: -1 };
                    break;
                case 'timing':
                    sortStage = { timingOrder: 1 };
                    break;
                case 'recommended':
                default:
                    sortStage = { adFlag: -1, rating: -1 };
                    break;
            }
            const pipeline = [
                { $match: matchStage },
                {
                    $lookup: {
                        from: 'restaurants',
                        localField: 'restaurantId',
                        foreignField: '_id',
                        as: 'restaurant',
                    },
                },
                { $unwind: '$restaurant' },
                sortValue === 'timing'
                    ? {
                        $addFields: {
                            timingOrder: {
                                $switch: {
                                    branches: Object.entries(timingOrder).map(([key, value]) => ({
                                        case: { $eq: ['$timing', key] },
                                        then: value,
                                    })),
                                    default: 5,
                                },
                            },
                        },
                    }
                    : { $match: {} },
                sortValue === 'recommended'
                    ? {
                        $addFields: {
                            adFlag: { $cond: { if: { $gt: [{ $rand: {} }, 0.7] }, then: true, else: false } },
                        },
                    }
                    : { $match: {} },
                { $sort: sortStage },
                {
                    $project: {
                        _id: 1,
                        restaurantId: 1,
                        restaurantName: '$restaurant.restaurantName',
                        isOnline: '$restaurant.isOnline',
                        name: 1,
                        description: 1,
                        category: 1,
                        price: 1,
                        quantity: 1,
                        images: 1,
                        hasVariants: 1,
                        variants: 1,
                        timing: 1,
                        rating: { $ifNull: ['$rating', 4.0] },
                        adFlag: { $ifNull: ['$adFlag', false] },
                        createdAt: 1,
                        updatedAt: 1,
                        isActive: 1,
                    },
                },
            ];
            const menuItems = await menuItemModel.aggregate(pipeline);
            return menuItems;
        } catch (error) {
            console.log('Error in sortAllMenu:', error);
            throw new Error((error as Error).message);
        }
    }
}