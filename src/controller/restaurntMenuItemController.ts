import RestaurntMenuItemUseCase from "../useCases/restaurntMenu.use-cse";

export default class RestaurantMenuController {
    private addMenuUseCase: RestaurntMenuItemUseCase;

    constructor(addMenuUseCase: RestaurntMenuItemUseCase) {
        this.addMenuUseCase = addMenuUseCase;
    }

    addMenuItems = async (data: any) => {
        try {
            const result = await this.addMenuUseCase.addMenuItem(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    getAllVariants = async (restaurantId: string) => {
        try {
            const result = await this.addMenuUseCase.getAllVariants(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    getAllMenuData = async (restaurantId: any) => {
        try {
            const result = await this.addMenuUseCase.getAllMenuData(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    getSpecificMenuData = async (restaurantId: string) => {
        try {
            const result = await this.addMenuUseCase.getSpecificMenu(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    editMenuItems = async (data: any) => {
        try {
            const result = await this.addMenuUseCase.editMenuItems(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    softDeleteMenu = async (restaurantId: string) => {
        try {
            const result = await this.addMenuUseCase.softDeleteMenu(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    getAllRestaurantMenus = async (data: any) => {
        try {
            const result = await this.addMenuUseCase.getAllRestaurantMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    // getAllRestaurantDishes = async (data: any) => {
    //     try {
    //         const result = await this.addMenuUseCase.getAllRestaurantDishes(data);
    //         return result;
    //     } catch (error) {
    //         return { error: (error as Error).message };
    //     }
    // };

    sortAllMenus = async (data: any) => {
        try {
            const result = await this.addMenuUseCase.sortAllMenus(data)
            return result
        } catch (error) {

        }
    }
}