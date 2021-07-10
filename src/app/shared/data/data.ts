export const applications = [
    {
        id:1,
        image: 'extranet.png',
        title:'Consulta Afiliado - 360',
        to: '../consulta-360',
        description: ''
    },
]

export const InputSelectFilter = [
    {
        element:'DNI',
        maxlength: '8',
        pattern:'[0-9]{8}',
        type:'number',
    },
    {
        element:'LE',
        maxlength: '8',
        pattern:'[0-9]{8}',
        type:'number',
    },
    {
        element:'CE',
        maxlength: '15',
        pattern:'[A-Za-z0-9]{3,15}',
        type:'text',
    },
    {
        element:'PAS',
        maxlength: '15',
        pattern:'[A-Za-z0-9]{5,15}',
        type:'text',
    },
    {
        element:'CMP',
        maxlength: '5',
        pattern:'',
        type:'text',
    },
    {
        element:'LAT',
        maxlength: '15',
        pattern:'',
        type:'text',
    },
    {
        element:'PTP',
        maxlength: '15',
        pattern:'[A-Za-z0-9]{3,15}',
        type:'text',
    },
    {
        element:'CRE',
        maxlength: '8',
        pattern:'[0-9]{8}',
        type:'number',
    },
    {
        element:'CIE',
        maxlength: '9',
        pattern:'[A-Za-z0-9]{8,9}',
        type:'text',
    },
    {
        element:'CSR',
        maxlength: '9',
        pattern:'[0-9]{8,9}',
        type:'number',
    },
]

export const notifications_data = [
    {
        id: 1,
        title: 'Solicitud 000542 Recibida',
        time: 'Hace 4 horas'
    },
    {
        id: 1,
        title: 'Solicitud 000548 Recibida',
        time: 'Hace 5 horas'
    },
    {
        id: 1,
        title: 'Solicitud 000555 Recibida',
        time: 'Hace 6 horas'
    },
    {
        id: 1,
        title: 'Solicitud 000562 Recibida',
        time: 'Hace 8 horas'
    },
]

export const affiliates_data = [
    {
        id: 1,
        name: 'Rosario del Carmen Mendoza Dominguez',
        docType: 'DNI',
        docNum: '42503060',
        cussp: '60254686TCRX7'
    }
]

export const documents_data = [
    {
        id: 1,
        description: 'Enviar Constancia de Afiliado',
        size: '232kb',
        url: ''
    },
    {
        id: 2,
        description: 'Enviar Estado de Cuenta',
        size: '200kb',
        url: ''
    },
    {
        id: 3,
        description: 'Enviar Reporte SBS',
        size: '301kb',
        url: ''
    },
    {
        id: 4,
        description: 'Enviar Documentos de Cargados',
        size: '552kb',
        url: ''
    },
    {
        id: 5,
        description: 'Enviar Gastos de Sepelio',
        size: '486kb',
        url: ''
    },
    {
        id: 6,
        description: 'Enviar Documentos de Herencia',
        size: '552kb',
        url: ''
    },
    {
        id: 7,
        description: 'Enviar Documentos de Invalidez',
        size: '872kb',
        url: ''
    },
]
