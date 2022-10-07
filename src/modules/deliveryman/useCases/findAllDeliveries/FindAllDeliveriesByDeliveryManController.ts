import { Request, Response } from "express";
import { FindAllDeliveriesByDeliveryManUseCase } from "./FindAllDeliveriesByDeliveryManUseCase";


export class FindAllDeliveriesByDeliveryManController {
    async handle(request: Request, response: Response) {
        const {id_deliveryman} = request;

        const findAllDeliveriesUseCase = new FindAllDeliveriesByDeliveryManUseCase()
        const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)
        console.log(deliveries)
        return response.json(deliveries)
    }
}