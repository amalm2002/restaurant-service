
import { MenuItemInterface } from '../../models/menu.model';
import { MenuItemDTO } from '../../dto/menu/menu-item.dto';

export interface IMenuRepository {
    createMenuItem(data: MenuItemDTO): Promise<MenuItemInterface>;
    getAllVariants(restaurantId: string): Promise<any[] | { error: string }>;
    getAllMenuData(restaurantId: string): Promise<MenuItemInterface[] | { error: string }>;
    getSpecificMenuData(menuItemId: string): Promise<MenuItemInterface | { error: string; status: number }>;
    editMenuItems(data: MenuItemDTO): Promise<MenuItemInterface>;
    softDeleteMenu(menuItemId: string): Promise<MenuItemInterface | { message: string }>;
    getRestaurantMenus(data: any): Promise<any[]>;
    sortAllMenu(params: { sortValue: string; searchTerm: string; category: string }): Promise<any[]>;
}