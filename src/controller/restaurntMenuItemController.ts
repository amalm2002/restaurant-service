
import RestaurntMenuItemUseCase from "../useCases/restaurntMenu.use-cse";

const addMenuUseCase=new RestaurntMenuItemUseCase()

export default class restaurantAddMenuController {
    addMenuItems=async (data:any)=>{
        try {
            const result=await addMenuUseCase.addMenuItem(data)
            return result
            
        } catch (error) {
           return ({error:(error as Error).message}) 
        }
    }

    getAllVariants=async (restaurantId:string) => {
        try {

            const result=await addMenuUseCase.getAllVariants(restaurantId)
            return result
            
        } catch (error) {
            return ({error:(error as Error).message})
        }
    }
}