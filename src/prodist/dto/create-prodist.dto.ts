import { IsString } from "class-validator";


export class ProdistDTO {
@IsString()
ContaDeLuz              : string; 

@IsString()           
NumeroDoCliente         : string; 

@IsString()   
ClasseUC                : string;

@IsString()
CotaMensal              : string;

@IsString()
PotenciaInstalada       : string;

@IsString()
TensaoDeAtendimento     : string;

@IsString()
TipoDeConexao           : string;

@IsString()
TipoDeRamal             : string;

@IsString()
PotenciaInstaladaGeral  : string;

@IsString()
TipoDaFonteDeGeracao    : string;

@IsString()
MenorConsumoUltimos12   : string;

@IsString()
MaiorConsumoUltimos12   : string;


}