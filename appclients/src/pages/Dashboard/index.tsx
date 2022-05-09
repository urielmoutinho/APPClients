import Header from '../../components/Header'
import Input from '../../components/Input';
import Button from '../../components/Button';
import {api} from '../../services/api'
import { Container, Form, Table, ButtonIcon } from './styles';
import { useState, FormEvent, useEffect} from 'react';
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'

interface DashboardProps {
  id:string;
  cliente:string;
  email:string;
  telefone:string;

}

function Dashboard() {
  const [cliente, setCliente] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataClients, setDataClients] = useState<DashboardProps[]>([])
  const [status, setStatus] = useState('Adding')

  async function HandleAddClient(event: FormEvent){
    event.preventDefault();
    const client = {
      cliente,
      email,
      telefone
    }
    if (status === 'Adding'){
      const { id } = await api.post('/clients',client).then(dados=> dados.data)
      setDataClients([...dataClients,{id, cliente,email,telefone}]);

   }else{
      await api.put(`/clients/${status}`, client)
   }
   setCliente('');
   setEmail('');
   setTelefone('');
   setStatus('Adding');
  } 
    async function HandleUpdateClient(id:string){
      const Alter = await api.get(`/clients/${id}`).then(Return => Return.data)
      setCliente(Alter.cliente);
      setEmail(Alter.email);
      setTelefone(Alter.telefone);
      setStatus(id);
    
    }

    async function HandleDeleteClient(id: string){
      setDataClients(dataClients.filter(cli => cli.id !== id))
      await api.delete(`/clients/${id}`);
    }
    async function loadClientes(){
    const dadosClients = await api.get('/clients').then(dados => dados.data);
    
    console.log(dadosClients);
    setDataClients(dadosClients)

  }

  useEffect(()=>{
    loadClientes()
  },[dataClients])




  return (
    <Container>
      <Header title="Cadastro de Clientes"/>

      <Form onSubmit={HandleAddClient}
        
      >    
        <Input onChange = {event => setCliente(event.target.value)}
        value={cliente}
        placeholder="Cliente"/>

        <Input onChange = {event => setEmail(event.target.value)}
        value={email}
        placeholder="E-mail"/>

        <Input onChange = {event => setTelefone(event.target.value)}
        value={telefone}
        placeholder="Telefone"/>
        
        <Button title="Send" 
        type='submit'
        />

      </Form>
      <Table>
        <thead>
          <tr>
          <th>Cliente</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dataClients.map((cli)=>(          
          <tr key={cli.id}>
            <td>{cli.cliente}</td>
            <td>{cli.email}</td>
            <td>{cli.telefone}</td>
            <td>
              <ButtonIcon onClick = {() => HandleDeleteClient(cli.id)} type="button">
                <AiOutlineDelete size={28}/>
              </ButtonIcon>          
              <ButtonIcon onClick={()=>HandleUpdateClient(cli.id)} type="button">
                <AiOutlineEdit size={28}/>
              </ButtonIcon>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
  
    </Container>
  );
};

export default Dashboard;
