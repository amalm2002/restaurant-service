
import { IRestaurantMenuService } from '../interfaces/restaurant-menu.service.interface';
import { IMenuRepository } from '../../repositories/interfaces/menu.repository.interface';
import { MenuItemDTO } from '../../dto/menu/menu-item.dto';

export default class RestaurantMenuService implements IRestaurantMenuService {
    private menuRepository: IMenuRepository;

    constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    async addMenuItem(data: MenuItemDTO) {
        try {
            return await this.menuRepository.createMenuItem(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllVariants(restaurantId: string) {
        try {
            return await this.menuRepository.getAllVariants(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllMenuData(restaurantId: string) {
        try {
            return await this.menuRepository.getAllMenuData(restaurantId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getSpecificMenu(menuItemId: string) {
        try {
            return await this.menuRepository.getSpecificMenuData(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async editMenuItems(data: MenuItemDTO) {
        try {
            return await this.menuRepository.editMenuItems(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async softDeleteMenu(menuItemId: string) {
        try {
            return await this.menuRepository.softDeleteMenu(menuItemId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllRestaurantMenus(data: any) {
        try {
            return await this.menuRepository.getRestaurantMenus(data);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async sortAllMenus(params: { sortValue: string; searchTerm: string; category: string }) {
        try {
            return await this.menuRepository.sortAllMenu(params);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}