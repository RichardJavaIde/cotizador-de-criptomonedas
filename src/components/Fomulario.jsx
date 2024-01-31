import {useEffect, useState} from 'react'
import styled  from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import Error from './Error'
//https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ADA,ATOM,AVAX,BAT,BCH,BNB,BSV&tsyms=USD,EUR
const InputSubnit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

function Fomulario({setMonedas}) {

    const [cripto, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda,SelectMonedas] = useSelectMonedas('Elige tu moneda',monedas)
    const [cm,SelectCm] = useSelectMonedas('Elige tu criptomoneda',cripto)
    

    useEffect(() => {
    const consultarAPI = async() => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return objeto
        })
        setCriptos(arrayCriptos)
    }
    consultarAPI()
    }, [])
    
    const handleSubmit = e => {
        event.preventDefault();

        if([moneda, cm].includes('')){
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            cm
        })
    }
  return (
    <>
    {error && <Error>Todos los campos son obligatirios</Error>}
    <form
    onSubmit={handleSubmit}
    >
        <SelectMonedas />
        <SelectCm />
        <InputSubnit
            type="submit"
            value="Cotizar"
        />
    </form>
    </>
  )
}

export default Fomulario
