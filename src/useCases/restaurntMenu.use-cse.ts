
import menuRepositery from "../repositeries/menuRepo";
import { MenuItemInterface } from "../entities/menu";
import { AddMenuItemDTO } from "../utilities/interface";

const restaurantRepo = new menuRepositery()

export default class restaurntAddMenuItemUseCase {
    addMenuItem = async (addMenuData: AddMenuItemDTO) => {
        try {
            const result = await restaurantRepo.createMenuItem(addMenuData);
            return result;
        } catch (error) {
            return ((error as Error).message);
        }
    };

    getAllVariants = async (restaurantId: string) => {
        try {
            const result = await restaurantRepo.getAllVariants(restaurantId)
            return result
        } catch (error) {
            return ((error as Error).message);
        }
    }
}