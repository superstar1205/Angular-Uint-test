import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { AffiliateService } from './affiliate.service';
import { SearchResponse } from 'src/app/shared/models/responses/Searchresponse';
import { of } from 'rxjs';

const appConfig = require('src/assets/configs/config.json');

describe('AffiliateService', () => {
  let service: AffiliateService;
  let httpMock: HttpTestingController;
  const res: SearchResponse = {
    statusResponse: true,
    countBody: 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),],
      providers: [
        AffiliateService,
        { provide: APP_CONFIG, useValue: appConfig },
      ]
    });
  
    service = TestBed.inject(AffiliateService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ProceduresDetail() should return current _proceduresDetail', () => {
    expect(service.ProceduresDetail).toBeTruthy();
  });

  it('Procedures() should return current _procedures', () => {
    expect(service.Procedures).toBeTruthy();
  });

  it('accessQuery() should return current _accessQuery', () => {
    expect(service.accessQuery).toBeTruthy();
  });

  it('affiliate() should return current _affiliate', () => {
    expect(service.affiliate).toBeTruthy();
  });

  it('should call SearchAffiliate with type 1', () => {
    const res: SearchResponse = {
      statusResponse: true
    }
    service.SearchAffiliate(1, { primerNombre: 'abc', codigoPersona: '1'}).subscribe(res =>
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne('https/private/afiliado-codigo-persona?codigoPersona=1');
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call SearchAffiliate with type 2', () => {
    const searchData = {
      primerNombre: 'primerNombre',
      segundoNombre: 'segundoNombre',
      apellidoPaterno: 'apellidoPaterno',
      apellidoMaterno: 'apellidoMaterno'
    }
    service.SearchAffiliate(2, searchData).subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/afiliado-nombre?primerNombre=${searchData.primerNombre}&segundoNombre=${searchData.segundoNombre}&apellidoPaterno=${searchData.apellidoPaterno}&apellidoMaterno=${searchData.apellidoMaterno}`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call SearchAffiliate with type 2 and without statusResponse', () => {
    const searchData = {
      primerNombre: 'primerNombre',
      segundoNombre: 'segundoNombre',
      apellidoPaterno: 'apellidoPaterno',
      apellidoMaterno: 'apellidoMaterno'
    }
    service.SearchAffiliate(2, searchData).subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/afiliado-nombre?primerNombre=${searchData.primerNombre}&segundoNombre=${searchData.segundoNombre}&apellidoPaterno=${searchData.apellidoPaterno}&apellidoMaterno=${searchData.apellidoMaterno}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('should call SearchAffiliate with wrong type', () => {
    const searchData = {
      identificacionTipo: 'identificacionTipo',
      identificacionNumero: 'identificacionNumero'
    }
    service.SearchAffiliate(1231, searchData).subscribe(res =>
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/afiliado-tipo-documento?identificacionTipo=${searchData.identificacionTipo}&identificacionNumero=${searchData.identificacionNumero}`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('SearchAffiliate() should catch error', () => {
    const searchData = {
      identificacionTipo: 'identificacionTipo',
      identificacionNumero: 'identificacionNumero'
    }
    service.SearchAffiliate(1231, searchData).subscribe(res =>
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/afiliado-tipo-documento?identificacionTipo=${searchData.identificacionTipo}&identificacionNumero=${searchData.identificacionNumero}`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });

  it('should call SearchAffiliatexCode', () => {
    service.SearchAffiliatexCode().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call SearchAffiliatexCode without statusResponse', () => {
    service.SearchAffiliatexCode().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('SearchAffiliatexCode() should catch error', () => {
    service.SearchAffiliatexCode().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });

  it('SearchAffiliatexCode() should set affiliate ', () => {
    service.SearchAffiliatexCode().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.flush({
      statusResponseBody: 'mock_statusResponseBody',
      statusResponse: 'mock_statusResponse',
      countBody: 2
    });
    httpMock.verify();
  });

  it('should call ValidateUser', () => {
    service.ValidateUser('1', '2', '3').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call ValidateUser without statusResponse', () => {
    service.ValidateUser('1', '2', '3').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('ValidateUser() should catch error', () => {
    service.ValidateUser('1', '2', '3').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });

  it('should call GetConsultationProcedure', () => {
    service.GetConsultationProcedure().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call GetConsultationProcedure without statusResponse', () => {
    service.GetConsultationProcedure().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('GetConsultationProcedure() should catch error', () => {
    service.GetConsultationProcedure().subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-tramite`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });

  it('should call GetConsultationProcedureDetail', () => {
    service.GetConsultationProcedureDetail('abc').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-detalle-tramite?numeroTramite=abc`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call GetConsultationProcedureDetail without statusResponse', () => {
    service.GetConsultationProcedureDetail('abc').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-detalle-tramite?numeroTramite=abc`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('GetConsultationProcedureDetail() should catch error', () => {
    service.GetConsultationProcedureDetail('abc').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-detalle-tramite?numeroTramite=abc`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });

  it('should call GetAsesorValidate', () => {
    service.GetAsesorValidate('1', '3').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.flush(res);
    httpMock.verify();
  });

  it('should call GetAsesorValidate get without statusResponse', () => {
    service.GetAsesorValidate('1', '3').subscribe(res => 
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpMock.verify();
  });

  it('GetAsesorValidate() should catch error', () => {
    service.GetAsesorValidate('1', '3').subscribe(res =>
      expect(res).toEqual(res)
    );

    const req = httpMock.expectOne(`https/private/consulta-asesor?cuspp=1&programa=3`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));
    httpMock.verify();
  });
});
