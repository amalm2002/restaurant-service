
import { MenuItemDTO } from '../../dto/menu/menu-item.dto';

export interface IRestaurantMenuService {
    addMenuItem(data: MenuItemDTO): Promise<any>;
    getAllVariants(restaurantId: string): Promise<any>;
    getAllMenuData(restaurantId: string): Promise<any>;
    getSpecificMenu(menuItemId: string): Promise<any>;
    editMenuItems(data: MenuItemDTO): Promise<any>;
    softDeleteMenu(menuItemId: string): Promise<any>;
    getAllRestaurantMenus(data: any): Promise<any>;
    sortAllMenus(params: { sortValue: string; searchTerm: string; category: string }): Promise<any>;
}