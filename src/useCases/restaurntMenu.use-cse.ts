import MenuRepository from "../repositeries/menuRepo";
import { MenuItemInterface } from "../entities/menu";
import { AddMenuItemDTO } from "../utilities/interface";

export default class RestaurntMenuItemUseCase {
    private restaurantRepo: MenuRepository;

    constructor(restaurantRepo: MenuRepository) {
        this.restaurantRepo = restaurantRepo;
    }

    addMenuItem = async (addMenuData: AddMenuItemDTO) => {
        try {
            const result = await this.restaurantRepo.createMenuItem(addMenuData);
            return result;
        } catch (error) {
            return (error as Error).message;
        }
    };

    getAllVariants = async (restaurantId: string) => {
        try {
            const result = await this.restaurantRepo.getAllVariants(restaurantId);
            return result;
        } catch (error) {
            return (error as Error).message;
        }
    };

    getAllMenuData = async (restaurantId: any) => {
        try {
            const result = await this.restaurantRepo.getAllMenuData(restaurantId);
            return result;
        } catch (error) {
            return (error as Error).message;
        }
    };

    getSpecificMenu = async (menuItemId: string) => {
        try {
            const result = await this.restaurantRepo.getSpecificMenuData(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message, status: 500 };
        }
    };

    editMenuItems = async (editMenuItem: AddMenuItemDTO) => {
        try {
            const result = await this.restaurantRepo.editMenuItems(editMenuItem);
            return result;
        } catch (error) {
            return (error as Error).message;
        }
    };

    softDeleteMenu = async (restaurantId: string) => {
        try {
            const result = await this.restaurantRepo.softDeleteMenu(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    getAllRestaurantMenus = async (data: any) => {
        try {
            const result = await this.restaurantRepo.getRestaurantMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };
    
    getAllRestaurantDishes = async (data: any) => {
        try {
            const result = await this.restaurantRepo.getAllRestaurantDishes(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };
}