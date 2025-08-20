
import { IRestaurantMenuService } from '../interfaces/restaurant-menu.service.interface';
import { IMenuRepository } from '../../repositories/interfaces/menu.repository.interface';
import { MenuItemDTO, MenuItemResponseDTO } from '../../dto/menu/menu-item.dto';
import { VariantResponseDTO } from '../../dto/menu/variant.dto';
import { RestaurantMenuItemResponseDTO } from '../../dto/menu/get-all-restaurant.menu.dto';
import { SortedMenuItemResponseDTO, SortMenuDTO } from '../../dto/menu/sort-menu.dto';
import {
    CancelOrderQuantityUpdationDTO,
    CancelOrderQuantityUpdationResponseDTO,
    CheckStockAvailabilityResponseDTO,
    DecrementStockDTO,
    DecrementStockResponseDTO,
    UpdateMenuQuantityDTO,
    UpdateMenuQuantityResponseDTO
} from '../../dto/menu/update-quantity.dto';

export default class RestaurantMenuService implements IRestaurantMenuService {

    constructor(
        private readonly _menuRepository: IMenuRepository
    ) { }

    async addMenuItem(newMenuItem: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            return await this._menuRepository.createMenuItem(newMenuItem);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllVariants(restaurantId: string): Promise<VariantResponseDTO[] | { error: string }> {
        try {
            return await this._menuRepository.getAllVariants(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemResponseDTO[] | { error: string }> {
        try {
            return await this._menuRepository.getAllMenuData(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getSpecificMenu(menuItemId: string): Promise<MenuItemResponseDTO | { error: string }> {
        try {
            return await this._menuRepository.getSpecificMenuData(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async editMenuItems(updatedMenuItem: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            return await this._menuRepository.editMenuItems(updatedMenuItem);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async softDeleteMenu(menuItemId: string): Promise<MenuItemResponseDTO | { message: string }> {
        try {
            return await this._menuRepository.softDeleteMenu(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllRestaurantMenus(data: void): Promise<RestaurantMenuItemResponseDTO[]> {
        try {
            return await this._menuRepository.getRestaurantMenus(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async sortAllMenus(sortOptions: SortMenuDTO): Promise<SortedMenuItemResponseDTO[]> {
        try {
            return await this._menuRepository.sortAllMenu(sortOptions);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateMenuQuantity(quantityUpdate: UpdateMenuQuantityDTO): Promise<UpdateMenuQuantityResponseDTO> {
        try {
            return await this._menuRepository.updateMenuQuantity(quantityUpdate)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async cancelOrderQuantityUpdations(cancelUpdate: CancelOrderQuantityUpdationDTO): Promise<CancelOrderQuantityUpdationResponseDTO> {
        try {
            return await this._menuRepository.cancelOrderQuantityUpdations(cancelUpdate)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async checkStockAvailability(stockCheck: any): Promise<CheckStockAvailabilityResponseDTO> {
        try {
            return await this._menuRepository.checkStockAvailability(stockCheck)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async decrementStock(stockDecrement: DecrementStockDTO): Promise<DecrementStockResponseDTO> {
        try {
            return await this._menuRepository.decrementStock(stockDecrement)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}