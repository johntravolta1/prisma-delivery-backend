import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveris/useCases/createDelivery/CreateDeliveryController";
import { FindAllWithouAvailableController } from "./modules/deliveris/useCases/findAllAvailable/FindAllWithoutEndDateController";
import { UpdateDeliverymanController } from "./modules/deliveris/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveris/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesByDeliveryManController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesByDeliveryManController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const deliveryCotroller = new CreateDeliveryController()
const findAllAvailable = new FindAllWithouAvailableController()

const updateDeliverymanController = new UpdateDeliverymanController()

const findAllDeliveriesClient = new FindAllDeliveriesController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesByDeliveryManController()

const updateEndDateDelivery = new UpdateEndDateController()

routes.post('/clients/', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/delivery',ensureAuthenticateClient,deliveryCotroller.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailable.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle)

routes.put('/deliveries/updateEndDate/:id', ensureAuthenticateDeliveryman,updateEndDateDelivery.handle )
export {routes}