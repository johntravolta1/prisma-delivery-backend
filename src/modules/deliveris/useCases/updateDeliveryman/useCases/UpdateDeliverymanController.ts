import { Request, Response } from "express";
import { UpdateDeliveryManUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
    async handle(request: Request, response: Response) {
        const {id_deliveryman} = request
        const {id} = request.params

        const updateDeliverymanUseCase = new UpdateDeliveryManUseCase()
        const delivery = await updateDeliverymanUseCase.execute({
            id_deliveryman,
            id_delivery: id
        })

        return response.json(delivery)
    }
}