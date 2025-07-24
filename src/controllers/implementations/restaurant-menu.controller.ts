import { IRestaurantMenuController } from '../interfaces/restaurant-menu.controller.interface';
import { IRestaurantMenuService } from '../../services/interfaces/restaurant-menu.service.interface';
import { CartItemDTO, MenuItemDTO, MenuItemResponseDTO } from '../../dto/menu/menu-item.dto';
import { VariantResponseDTO } from '../../dto/menu/variant.dto';
import { RestaurantMenuItemResponseDTO } from '../../dto/menu/get-all-restaurant.menu.dto';
import { SortedMenuItemResponseDTO, SortMenuDTO } from '../../dto/menu/sort-menu.dto';
import {
    CancelOrderQuantityUpdationDTO,
    CancelOrderQuantityUpdationResponseDTO,
    DecrementStockDTO,
    DecrementStockResponseDTO,
    UpdateMenuQuantityDTO,
    UpdateMenuQuantityResponseDTO
} from '../../dto/menu/update-quantity.dto';

export default class RestaurantMenuController implements IRestaurantMenuController {
    private menuService: IRestaurantMenuService;

    constructor(menuService: IRestaurantMenuService) {
        this.menuService = menuService;
    }

    async addMenuItems(data: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            const result = await this.menuService.addMenuItem(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllVariants(restaurantId: string): Promise<VariantResponseDTO[] | { error: string }> {
        try {
            const result = await this.menuService.getAllVariants(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this.menuService.getAllMenuData(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getSpecificMenuData(menuItemId: string): Promise<MenuItemResponseDTO | { error: string }> {
        try {
            const result = await this.menuService.getSpecificMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async editMenuItems(data: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            const result = await this.menuService.editMenuItems(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async softDeleteMenu(menuItemId: string): Promise<MenuItemResponseDTO | { message: string }> {
        try {
            const result = await this.menuService.softDeleteMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllRestaurantMenus(data: void): Promise<RestaurantMenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this.menuService.getAllRestaurantMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async sortAllMenus(data: SortMenuDTO): Promise<SortedMenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this.menuService.sortAllMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async updateMenuQuantity(data: UpdateMenuQuantityDTO): Promise<UpdateMenuQuantityResponseDTO> {
        try {
            const result = await this.menuService.updateMenuQuantity(data)
            return result
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async cancelOrderQuantityUpdation(refundData: CancelOrderQuantityUpdationDTO): Promise<CancelOrderQuantityUpdationResponseDTO> {
        try {
            const result = await this.menuService.cancelOrderQuantityUpdations(refundData)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }

    async checkStockAvailability(data: any): Promise<any> {
        try {
            const result = await this.menuService.checkStockAvailability(data)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }

    async decrementStock(data: DecrementStockDTO): Promise<DecrementStockResponseDTO> {
        try {
            const result = await this.menuService.decrementStock(data)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }
}