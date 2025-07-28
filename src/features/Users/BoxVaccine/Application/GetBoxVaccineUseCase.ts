import type { BoxVaccine } from "../Domain/BoxVaccine";
import { BoxRepository } from "../Domain/BoxVaccineRepository";

export class GetBoxUseCase {
    private boxRepository: BoxRepository;
    
        constructor (){
            this.boxRepository = new BoxRepository
        }
    
        async execute(): Promise<BoxVaccine[]>{
            try{
                const box = await this.boxRepository.getBoxs();
                console.log("cajas", box)
                return box
            }catch{
                console.error("Error fetch groups:",Error);
                throw Error;
            }
        }
}