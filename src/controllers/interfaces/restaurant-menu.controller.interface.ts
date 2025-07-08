
import { CartItemDTO, MenuItemDTO } from '../../dto/menu/menu-item.dto';

export interface IRestaurantMenuController {
    addMenuItems(data: MenuItemDTO): Promise<any>;
    getAllVariants(restaurantId: string): Promise<any>;
    getAllMenuData(restaurantId: string): Promise<any>;
    getSpecificMenuData(menuItemId: string): Promise<any>;
    editMenuItems(data: MenuItemDTO): Promise<any>;
    softDeleteMenu(menuItemId: string): Promise<any>;
    getAllRestaurantMenus(data: any): Promise<any>;
    sortAllMenus(data: { sortValue: string; searchTerm: string; category: string }): Promise<any>;
    updateMenuQuantity(data: { cartItems: CartItemDTO[] }): Promise<any>
    cancelOrderQuantityUpdation(refundData: { userId: string, restaurantId: string; items: Array<{ foodId: string; quantity: number }> }): Promise<{ success: boolean, message: string, error?: string | undefined }>
}