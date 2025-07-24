import menuItemModel, { MenuItemInterface } from '../../models/menu.model';
import { IMenuRepository } from '../interfaces/menu.repository.interface';
import { CartItemDTO, MenuItemDTO } from '../../dto/menu/menu-item.dto';
import { BaseRepository } from './base.repository';

export default class MenuRepository extends BaseRepository<MenuItemInterface> implements IMenuRepository {
    constructor() {
        super(menuItemModel);
    }

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

    async getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemInterface[] | { error: string }> {
        // try {
        //     const getAllMenuItems = await menuItemModel.find({ restaurantId });
        //     return getAllMenuItems;
        // } catch (error) {
        //     console.log('Error on get all menus in the menuRepo');
        //     return { error: (error as Error).message };
        // }
        try {
            const query: any = { restaurantId };
            // console.log('restaurant id :',query,search,category);
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ];
            }

            if (category && category !== 'all') {
                query.category = category;
            }

            const getAllMenuItems = await menuItemModel.find(query);
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
            return updated;
        } catch (error) {
            console.log('Error on edit menu side', error);
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

    async getRestaurantMenus(data: void): Promise<any[]> {
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
            console.log('restaurant details  :', restaurantDetails);

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

    async updateMenuQuantity(data: { cartItems: CartItemDTO[] }): Promise<any> {
        try {
            const { cartItems } = data;
            for (const item of cartItems) {
                const menuItem = await menuItemModel.findById(item.id);
                if (!menuItem) {
                    throw new Error(`Menu item ${item.name} not found`);
                }
                if (menuItem.quantity < item.quantity) {
                    throw new Error(`Item "${menuItem.name}" is out of stock or insufficient quantity`);
                }
                await menuItemModel.findByIdAndUpdate(
                    item.id,
                    { $inc: { quantity: -item.quantity } },
                    { new: true }
                );
            }
            return { success: true, message: 'updated success ' };
        } catch (error) {
            console.log('Error on update menu quantity restaurant menu side');
            throw new Error((error as Error).message);
        }
    }

    async cancelOrderQuantityUpdations(refundData: {
        userId: string;
        restaurantId: string;
        items: Array<{
            foodId: string;
            quantity: number
        }>
    }): Promise<{ success: boolean; message: string; error?: string | undefined }> {
        try {
            const { userId, restaurantId, items } = refundData;
            for (const item of items) {
                const menuItem = await menuItemModel.findById(item.foodId);
                if (!menuItem) {
                    throw new Error(`Menu item not found`);
                }
                await menuItemModel.findByIdAndUpdate(item.foodId,
                    { $inc: { quantity: +item.quantity } },
                    { new: true });
            }
            return { success: true, message: 'updated success ' };
        } catch (error) {
            console.log('Error on cancel order update menu quantity restaurant menu side');
            throw new Error((error as Error).message);
        }
    }

    async checkStockAvailability(cartItems: { id: string; quantity: number }[]): Promise<{ success: boolean, message?: string; error?: string }> {
        for (const item of cartItems) {
            const menuItem = await menuItemModel.findById(item.id);
            if (!menuItem || menuItem.quantity < item.quantity) {
                console.log('Insufficient stock for:', item.id);
                return { success: false, message: `Insufficient stock for item ${item.id}` };
            }
        }
        return { success: true };
    }

    async decrementStock(data: any): Promise<{ success: boolean }> {
        const cartItems = data.cartItems;
        if (!Array.isArray(cartItems)) return { success: false };

        for (const item of cartItems) {
            const { id, quantity } = item;
            const result = await menuItemModel.updateOne(
                { _id: id, quantity: { $gte: quantity } },
                { $inc: { quantity: -quantity } }
            );
            // console.log(`Updating stock for ${id} result:`, result);
            if (result.modifiedCount === 0) return { success: false };
        }

        return { success: true };
    }
}