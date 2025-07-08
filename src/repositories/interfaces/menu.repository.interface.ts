
import { MenuItemInterface } from '../../models/menu.model';
import { CartItemDTO, MenuItemDTO } from '../../dto/menu/menu-item.dto';

export interface IMenuRepository {
    createMenuItem(data: MenuItemDTO): Promise<MenuItemInterface>;
    getAllVariants(restaurantId: string): Promise<any[] | { error: string }>;
    getAllMenuData(restaurantId: string): Promise<MenuItemInterface[] | { error: string }>;
    getSpecificMenuData(menuItemId: string): Promise<MenuItemInterface | { error: string; status: number }>;
    editMenuItems(data: MenuItemDTO): Promise<MenuItemInterface>;
    softDeleteMenu(menuItemId: string): Promise<MenuItemInterface | { message: string }>;
    getRestaurantMenus(data: any): Promise<any[]>;
    sortAllMenu(params: { sortValue: string; searchTerm: string; category: string }): Promise<any[]>;
    updateMenuQuantity(data: { cartItems: CartItemDTO[] }): Promise<any>
    cancelOrderQuantityUpdations(refundData: { userId: string, restaurantId: string; items: Array<{ foodId: string; quantity: number }> }): Promise<{ success: boolean, message: string, error?: string | undefined }>
}