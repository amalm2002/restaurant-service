import { IRestaurantMenuController } from '../interfaces/restaurant-menu.controller.interface';
import { IRestaurantMenuService } from '../../services/interfaces/restaurant-menu.service.interface';
import { CartItemDTO, MenuItemDTO } from '../../dto/menu/menu-item.dto';

export default class RestaurantMenuController implements IRestaurantMenuController {
    private menuService: IRestaurantMenuService;

    constructor(menuService: IRestaurantMenuService) {
        this.menuService = menuService;
    }

    async addMenuItems(data: MenuItemDTO) {
        try {
            const result = await this.menuService.addMenuItem(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllVariants(restaurantId: string) {
        try {
            const result = await this.menuService.getAllVariants(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllMenuData(restaurantId: string) {
        try {
            const result = await this.menuService.getAllMenuData(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getSpecificMenuData(menuItemId: string) {
        try {
            const result = await this.menuService.getSpecificMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async editMenuItems(data: MenuItemDTO) {
        try {
            const result = await this.menuService.editMenuItems(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async softDeleteMenu(menuItemId: string) {
        try {
            const result = await this.menuService.softDeleteMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllRestaurantMenus(data: any) {
        try {
            const result = await this.menuService.getAllRestaurantMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async sortAllMenus(data: { sortValue: string; searchTerm: string; category: string }) {
        try {
            const result = await this.menuService.sortAllMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async updateMenuQuantity(data: { cartItems: CartItemDTO[] }): Promise<any> {
        try {
            const result = await this.menuService.updateMenuQuantity(data)
            return result
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async cancelOrderQuantityUpdation(refundData: { userId: string; restaurantId: string; items: Array<{ foodId: string; quantity: number; }>; }): Promise<{ success: boolean; message: string; error?: string | undefined; }> {
        try {
            const result = await this.menuService.cancelOrderQuantityUpdations(refundData)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }
}