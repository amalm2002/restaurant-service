
import { RestaurantMenuItemResponseDTO } from '../../dto/menu/get-all-restaurant.menu.dto';
import { CartItemDTO, MenuItemDTO, MenuItemResponseDTO } from '../../dto/menu/menu-item.dto';
import { SortedMenuItemResponseDTO, SortMenuDTO } from '../../dto/menu/sort-menu.dto';
import { CancelOrderQuantityUpdationDTO, CancelOrderQuantityUpdationResponseDTO, CheckStockAvailabilityResponseDTO, DecrementStockDTO, DecrementStockResponseDTO, UpdateMenuQuantityDTO, UpdateMenuQuantityResponseDTO } from '../../dto/menu/update-quantity.dto';
import { VariantResponseDTO } from '../../dto/menu/variant.dto';

export interface IRestaurantMenuController {
    addMenuItems(data: MenuItemDTO): Promise<MenuItemResponseDTO>;
    getAllVariants(restaurantId: string): Promise<VariantResponseDTO[] | { error: string }>;
    getAllMenuData(restaurantId: string, search?: string, category?: string): Promise<MenuItemResponseDTO[] | { error: string }>;
    getSpecificMenuData(menuItemId: string): Promise<MenuItemResponseDTO | { error: string }>;
    editMenuItems(data: MenuItemDTO): Promise<MenuItemResponseDTO>;
    softDeleteMenu(menuItemId: string): Promise<MenuItemResponseDTO | { message: string }>;
    getAllRestaurantMenus(data: void): Promise<RestaurantMenuItemResponseDTO[] | { error: string }>;
    sortAllMenus(data: SortMenuDTO): Promise<SortedMenuItemResponseDTO[] | { error: string }>;
    updateMenuQuantity(data: UpdateMenuQuantityDTO): Promise<UpdateMenuQuantityResponseDTO>
    cancelOrderQuantityUpdation(refundData: CancelOrderQuantityUpdationDTO): Promise<CancelOrderQuantityUpdationResponseDTO>
    checkStockAvailability(data: any): Promise<CheckStockAvailabilityResponseDTO>
    decrementStock(data: DecrementStockDTO): Promise<DecrementStockResponseDTO>
}