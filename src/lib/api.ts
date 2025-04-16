
import { 
  Cliente, 
  Conta, 
  Agencia, 
  ClienteRaw, 
  ContaRaw, 
  AgenciaRaw 
} from '../types';

// URLs dos dados em formato CSV
const CLIENTES_URL = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const CONTAS_URL = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const AGENCIAS_URL = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

/**
 * Função para buscar dados CSV a partir de uma URL
 * @param url URL para buscar os dados CSV
 * @returns Promise com o texto CSV
 */
export async function fetchCSV(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Erro ao buscar dados CSV:", error);
    throw error;
  }
}

/**
 * Função para parsear o texto CSV em um array de objetos
 * @param csv Texto CSV para parsear
 * @returns Array de objetos com os dados parseados
 */
export function parseCSV<T>(csv: string): T[] {
  // Dividir por linhas
  const lines = csv.split('\n');
  
  // A primeira linha contém os cabeçalhos
  const headers = parseCSVLine(lines[0]);
  
  // Parsear cada linha em um objeto usando os cabeçalhos como chaves
  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    return obj as unknown as T;
  });
}

/**
 * Função auxiliar para parsear uma linha de CSV respeitando aspas
 * @param line Linha de CSV para parsear
 * @returns Array de valores da linha
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Se encontrarmos aspas, alternamos o estado 'inQuotes'
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      // Se encontrarmos uma vírgula e não estivermos entre aspas,
      // finalizamos o valor atual e iniciamos um novo
      result.push(current);
      current = '';
    } else {
      // Caso contrário, adicionamos o caractere ao valor atual
      current += char;
    }
  }
  
  // Adicionar o último valor
  result.push(current);
  
  // Remover aspas extras e espaços em branco
  return result.map(value => {
    value = value.trim();
    // Remover aspas no início e fim, se presentes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    return value;
  });
}

/**
 * Converte os dados brutos de Cliente para o formato correto
 * @param clientesRaw Dados brutos de clientes
 * @returns Clientes convertidos
 */
export function convertClientes(clientesRaw: ClienteRaw[]): Cliente[] {
  return clientesRaw.map(cliente => ({
    ...cliente,
    dataNascimento: new Date(parseDate(cliente.dataNascimento)),
    rendaAnual: parseFloat(cliente.rendaAnual.replace(/[^\d.-]/g, '')),
    patrimonio: parseFloat(cliente.patrimonio.replace(/[^\d.-]/g, '')),
    codigoAgencia: parseInt(cliente.codigoAgencia, 10)
  }));
}

/**
 * Converte os dados brutos de Conta para o formato correto
 * @param contasRaw Dados brutos de contas
 * @returns Contas convertidas
 */
export function convertContas(contasRaw: ContaRaw[]): Conta[] {
  return contasRaw.map(conta => ({
    ...conta,
    saldo: parseFloat(conta.saldo.replace(/[^\d.-]/g, '')),
    limiteCredito: parseFloat(conta.limiteCredito.replace(/[^\d.-]/g, '')),
    creditoDisponivel: parseFloat(conta.creditoDisponivel.replace(/[^\d.-]/g, ''))
  }));
}

/**
 * Converte os dados brutos de Agencia para o formato correto
 * @param agenciasRaw Dados brutos de agências
 * @returns Agências convertidas
 */
export function convertAgencias(agenciasRaw: AgenciaRaw[]): Agencia[] {
  return agenciasRaw.map(agencia => ({
    ...agencia,
    codigo: parseInt(agencia.codigo, 10)
  }));
}

/**
 * Função auxiliar para converter string de data no formato brasileiro para o formato Date
 * @param dateStr String de data no formato brasileiro (DD/MM/YYYY)
 * @returns String de data no formato ISO (YYYY-MM-DD)
 */
function parseDate(dateStr: string): string {
  // Verificar se a data está no formato DD/MM/YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return dateStr; // Caso não esteja no formato esperado, retorna a string original
}

/**
 * Busca todos os clientes
 * @returns Promise com a lista de clientes
 */
export async function fetchClientes(): Promise<Cliente[]> {
  try {
    const csv = await fetchCSV(CLIENTES_URL);
    const clientesRaw = parseCSV<ClienteRaw>(csv);
    return convertClientes(clientesRaw);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

/**
 * Busca todas as contas
 * @returns Promise com a lista de contas
 */
export async function fetchContas(): Promise<Conta[]> {
  try {
    const csv = await fetchCSV(CONTAS_URL);
    const contasRaw = parseCSV<ContaRaw>(csv);
    return convertContas(contasRaw);
  } catch (error) {
    console.error("Erro ao buscar contas:", error);
    throw error;
  }
}

/**
 * Busca todas as agências
 * @returns Promise com a lista de agências
 */
export async function fetchAgencias(): Promise<Agencia[]> {
  try {
    const csv = await fetchCSV(AGENCIAS_URL);
    const agenciasRaw = parseCSV<AgenciaRaw>(csv);
    return convertAgencias(agenciasRaw);
  } catch (error) {
    console.error("Erro ao buscar agências:", error);
    throw error;
  }
}

/**
 * Formata valores monetários para exibição
 * @param value Valor monetário
 * @returns String formatada (exemplo: R$ 1.234,56)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata datas para exibição
 * @param date Data a ser formatada
 * @returns String formatada (exemplo: 01/01/2022)
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

/**
 * Formata CPF/CNPJ para exibição
 * @param cpfCnpj CPF ou CNPJ
 * @returns String formatada
 */
export function formatCpfCnpj(cpfCnpj: string): string {
  // Remove qualquer caractere não-numérico
  const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
  
  // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (cleanCpfCnpj.length === 11) {
    // Formata CPF: XXX.XXX.XXX-XX
    return cleanCpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleanCpfCnpj.length === 14) {
    // Formata CNPJ: XX.XXX.XXX/XXXX-XX
    return cleanCpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  // Retorna o valor original se não conseguir formatar
  return cpfCnpj;
}

/**
 * Busca a agência pelo código
 * @param codigo Código da agência
 * @param agencias Lista de agências
 * @returns Agência encontrada ou undefined
 */
export function findAgenciaByCodigo(codigo: number, agencias: Agencia[]): Agencia | undefined {
  return agencias.find(agencia => agencia.codigo === codigo);
}

/**
 * Busca as contas de um cliente pelo CPF/CNPJ
 * @param cpfCnpj CPF/CNPJ do cliente
 * @param contas Lista de contas
 * @returns Lista de contas do cliente
 */
export function findContasByCliente(cpfCnpj: string, contas: Conta[]): Conta[] {
  return contas.filter(conta => conta.cpfCnpjCliente === cpfCnpj);
}

/**
 * Busca um cliente pelo ID
 * @param id ID do cliente
 * @param clientes Lista de clientes
 * @returns Cliente encontrado ou undefined
 */
export function findClienteById(id: string, clientes: Cliente[]): Cliente | undefined {
  return clientes.find(cliente => cliente.id === id);
}
