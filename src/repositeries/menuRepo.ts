import menuItemModel, { MenuItemInterface } from '../entities/menu';
import { AddMenuItemDTO } from '../utilities/interface';

export default class restaurantRepositery {
    async createMenuItem(data: AddMenuItemDTO): Promise<MenuItemInterface> {
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
}
