import { IRestaurantMenuController } from '../interfaces/restaurant-menu.controller.interface';
import { IRestaurantMenuService } from '../../services/interfaces/restaurant-menu.service.interface';
import { MenuItemDTO, MenuItemResponseDTO } from '../../dto/menu/menu-item.dto';
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

    constructor(
        private readonly _menuService: IRestaurantMenuService

    ) { }

    async addMenuItems(newMenuItem: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            const result = await this._menuService.addMenuItem(newMenuItem);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllVariants(restaurantId: string): Promise<VariantResponseDTO[] | { error: string }> {
        try {
            const result = await this._menuService.getAllVariants(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this._menuService.getAllMenuData(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getSpecificMenuData(menuItemId: string): Promise<MenuItemResponseDTO | { error: string }> {
        try {
            const result = await this._menuService.getSpecificMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async editMenuItems(updatedMenuItem: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            const result = await this._menuService.editMenuItems(updatedMenuItem);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async softDeleteMenu(menuItemId: string): Promise<MenuItemResponseDTO | { message: string }> {
        try {
            const result = await this._menuService.softDeleteMenu(menuItemId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getAllRestaurantMenus(data: void): Promise<RestaurantMenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this._menuService.getAllRestaurantMenus(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async sortAllMenus(sortOptions: SortMenuDTO): Promise<SortedMenuItemResponseDTO[] | { error: string }> {
        try {
            const result = await this._menuService.sortAllMenus(sortOptions);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async updateMenuQuantity(quantityUpdate: UpdateMenuQuantityDTO): Promise<UpdateMenuQuantityResponseDTO> {
        try {
            const result = await this._menuService.updateMenuQuantity(quantityUpdate)
            return result
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async cancelOrderQuantityUpdation(cancelUpdate: CancelOrderQuantityUpdationDTO): Promise<CancelOrderQuantityUpdationResponseDTO> {
        try {
            const result = await this._menuService.cancelOrderQuantityUpdations(cancelUpdate)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }

    async checkStockAvailability(stockCheck: any): Promise<any> {
        try {
            const result = await this._menuService.checkStockAvailability(stockCheck)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }

    async decrementStock(stockDecrement: DecrementStockDTO): Promise<DecrementStockResponseDTO> {
        try {
            const result = await this._menuService.decrementStock(stockDecrement)
            return result
        } catch (error) {
            return { success: false, message: 'somthing went wrong', error: (error as Error).message };
        }
    }
}