import menuItemModel, { MenuItemInterface } from '../entities/menu';
import { AddMenuItemDTO } from '../utilities/interface';
import restaurantModel from '../entities/restaurant';

export default class restaurantRepositery {

    async createMenuItem(data: AddMenuItemDTO): Promise<MenuItemInterface> {
        const existingItem = await menuItemModel.findOne({
            name: data.name,
            restaurantId: data.restaurantId
        });

        if (existingItem) {
            throw new Error('Menu item already exists');
        }

        const createdItem = new menuItemModel({
            ...data
        });

        return await createdItem.save();
    }

    getAllVariants = async (restaurantId: string) => {
        try {
            const menuItems = await menuItemModel.find({ restaurantId });

            const allVariants = menuItems.flatMap(item => item.variants || []);

            return allVariants;

        } catch (error) {
            console.log('error on gett all variants in the menuRepo');
            return ({ error: (error as Error).message })
        }
    }

    getAllMenuData = async (restaurantId: any) => {
        try {

            const getAllMenuItems = await menuItemModel.find({ restaurantId })
            return getAllMenuItems

        } catch (error) {
            console.log('error on gett all menus in the menuRepo');
            return ({ error: (error as Error).message })
        }
    }

    getSpecificMenuData = async (menuItemId: string) => {
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
    };

    editMenuItems = async (data: AddMenuItemDTO): Promise<MenuItemInterface> => {
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
                    }
                },
                { new: true }
            );

            return updated!;
        } catch (error) {
            console.log('error has to show on edit menu side');
            throw new Error((error as Error).message);
        }
    }

    softDeleteMenu = async (restaurantId: string) => {
        try {

            const menuItem = await menuItemModel.findById(restaurantId);
            if (!menuItem) {
                return { message: 'Restaurant is not found' }
            }

            const updatedMenuItem = await menuItemModel.findByIdAndUpdate(
                restaurantId,
                { $set: { isActive: !menuItem.isActive } },
                { new: true }
            );

            return updatedMenuItem;

        } catch (error) {
            console.log('error has to show on delete menu side');
            throw new Error((error as Error).message);
        }
    }

    getRestaurantMenus = async (data: any) => {
        try {
            const restaurantDetails = await menuItemModel.aggregate([
                { $match: { isActive: true } },
                {
                    $lookup: {
                        from: "restaurants",
                        localField: "restaurantId",
                        foreignField: "_id",
                        as: "restaurant",
                    },
                },
                { $unwind: "$restaurant" },
                {
                    $project: {
                        _id: 1,
                        restaurantId: 1,
                        restaurantName: "$restaurant.restaurantName",
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
            console.log(restaurantDetails.length);
            return restaurantDetails
        } catch (error) {
            console.log('error has to show on get all restaurnt menu side');
            throw new Error((error as Error).message);
        }
    }

    // getAllRestaurantDishes = async (data: any) => {
    //     try {
    //         const restaurantDetails = await menuItemModel.aggregate([
    //             { $match: { isActive: true } },
    //             {
    //                 $lookup: {
    //                     from: "restaurants",
    //                     localField: "restaurantId",
    //                     foreignField: "_id",
    //                     as: "restaurant",
    //                 },
    //             },
    //             { $unwind: "$restaurant" },
    //             {
    //                 $project: {
    //                     _id: 1,
    //                     restaurantId: 1,
    //                     restaurantName: "$restaurant.restaurantName",
    //                     isOnline: '$restaurant.isOnline',
    //                     name: 1,
    //                     description: 1,
    //                     category: 1,
    //                     price: 1,
    //                     quantity: 1,
    //                     images: 1,
    //                     hasVariants: 1,
    //                     variants: 1,
    //                     timing: 1,
    //                     createdAt: 1,
    //                     updatedAt: 1,
    //                     isActive: 1,
    //                 },
    //             },
    //         ]);
    //         console.log(restaurantDetails.length);
    //         return restaurantDetails
    //     } catch (error) {
    //         console.log('error has to show on get all restaurnt dishes side');
    //         throw new Error((error as Error).message);
    //     }
    // }

    sortAllMenu = async (params: { sortValue: string; searchTerm: string; category: string }) => {
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
