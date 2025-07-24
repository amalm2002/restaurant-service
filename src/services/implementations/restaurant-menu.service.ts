
import { IRestaurantMenuService } from '../interfaces/restaurant-menu.service.interface';
import { IMenuRepository } from '../../repositories/interfaces/menu.repository.interface';
import { CartItemDTO, MenuItemDTO, MenuItemResponseDTO } from '../../dto/menu/menu-item.dto';
import { VariantDTO, VariantResponseDTO } from '../../dto/menu/variant.dto';
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
    private menuRepository: IMenuRepository;

    constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    async addMenuItem(data: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            return await this.menuRepository.createMenuItem(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllVariants(restaurantId: string): Promise<VariantResponseDTO[] | { error: string }> {
        try {
            return await this.menuRepository.getAllVariants(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemResponseDTO[] | { error: string }> {
        try {
            return await this.menuRepository.getAllMenuData(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getSpecificMenu(menuItemId: string): Promise<MenuItemResponseDTO | { error: string }> {
        try {
            return await this.menuRepository.getSpecificMenuData(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async editMenuItems(data: MenuItemDTO): Promise<MenuItemResponseDTO> {
        try {
            return await this.menuRepository.editMenuItems(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async softDeleteMenu(menuItemId: string): Promise<MenuItemResponseDTO | { message: string }> {
        try {
            return await this.menuRepository.softDeleteMenu(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllRestaurantMenus(data: void): Promise<RestaurantMenuItemResponseDTO[]> {
        try {
            return await this.menuRepository.getRestaurantMenus(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async sortAllMenus(params: SortMenuDTO): Promise<SortedMenuItemResponseDTO[]> {
        try {
            return await this.menuRepository.sortAllMenu(params);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateMenuQuantity(data: UpdateMenuQuantityDTO): Promise<UpdateMenuQuantityResponseDTO> {
        try {
            return await this.menuRepository.updateMenuQuantity(data)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async cancelOrderQuantityUpdations(refundData: CancelOrderQuantityUpdationDTO): Promise<CancelOrderQuantityUpdationResponseDTO> {
        try {
            return await this.menuRepository.cancelOrderQuantityUpdations(refundData)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async checkStockAvailability(data: any): Promise<CheckStockAvailabilityResponseDTO> {
        try {
            return await this.menuRepository.checkStockAvailability(data)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async decrementStock(data: DecrementStockDTO): Promise<DecrementStockResponseDTO> {
        try {
            return await this.menuRepository.decrementStock(data)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}