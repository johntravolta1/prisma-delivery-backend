import { Request, Response } from "express";
import { FindAllWithoutAvailableUseCase } from "./FindAllWithoutEndDateUseCase";


export class FindAllWithouAvailableController {
    async handle(request: Request, response: Response) {
        const findAllAvailable = new FindAllWithoutAvailableUseCase();

        const deliveries = await findAllAvailable.execute()

        return response.json(deliveries)
    }
}