import {Router} from 'express';
import corteCajaController from '../controllers/cortecajaControllers';

class CortecajaRoutes{

  public router:Router=Router();

  constructor(){
    this.config();
  }
  config():void{
    this.router.post('/corte-caja', corteCajaController.corteDeCaja);

  }

}
const cortecajaRoutes=new CortecajaRoutes();
export default cortecajaRoutes.router; 




