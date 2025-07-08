// import SubscriptionPlan, { SubscriptionPlanInterface } from '../../models/subscription-plan.model';
// import { ISubscriptionPlanRepository } from '../interfaces/subscription-plan.repository.interface';
// import { SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';

// export default class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
//     async addSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface> {
//         try {
//             const newPlan = new SubscriptionPlan({
//                 name: data.name,
//                 price: parseFloat(data.price),
//                 period: data.period,
//                 description: data.description,
//                 features: data.features,
//                 popular: data.popular,
//             });
//             return await newPlan.save();
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }

//     async getAllSubscriptionPlans(): Promise<SubscriptionPlanInterface[]> {
//         try {
//             return await SubscriptionPlan.find();
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }

//     async updateSubscriptionPlan(id: string, data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface | null> {
//         try {
//             const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
//                 id,
//                 {
//                     name: data.name,
//                     price: parseFloat(data.price),
//                     period: data.period,
//                     description: data.description,
//                     features: data.features,
//                     popular: data.popular,
//                 },
//                 { new: true }
//             );
//             return updatedPlan;
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }

//     async deleteSubscriptionPlan(data: { id: string }): Promise<SubscriptionPlanInterface | null> {
//         try {
//             return await SubscriptionPlan.findByIdAndDelete(data.id);
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }
// }


import SubscriptionPlan, { SubscriptionPlanInterface } from '../../models/subscription-plan.model';
import { ISubscriptionPlanRepository } from '../interfaces/subscription-plan.repository.interface';
import { SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { BaseRepository } from './base.repository';

export default class SubscriptionPlanRepository extends BaseRepository<SubscriptionPlanInterface> implements ISubscriptionPlanRepository {
    constructor() {
        super(SubscriptionPlan);
    }

    async addSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface> {
        try {
            const newPlan = new SubscriptionPlan({
                name: data.name,
                price: parseFloat(data.price),
                period: data.period,
                description: data.description,
                features: data.features,
                popular: data.popular,
            });
            return await newPlan.save();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllSubscriptionPlans(): Promise<SubscriptionPlanInterface[]> {
        try {
            return await SubscriptionPlan.find();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateSubscriptionPlan(id: string, data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface | null> {
        try {
            const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
                id,
                {
                    name: data.name,
                    price: parseFloat(data.price),
                    period: data.period,
                    description: data.description,
                    features: data.features,
                    popular: data.popular,
                },
                { new: true }
            );
            return updatedPlan;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteSubscriptionPlan(data: { id: string }): Promise<SubscriptionPlanInterface | null> {
        try {
            return await SubscriptionPlan.findByIdAndDelete(data.id);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}