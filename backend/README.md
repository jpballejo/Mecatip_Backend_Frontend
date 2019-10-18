# Mecatip

<h2>MecaTip:</h2>

Juego de mecanografia creado por alumnos del Tecnologo Informatico de Payandú....
http://www.jolugama.com/blog/2018/11/09/app-mean-angular-docker/


  setHeader() {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.getToken()}` })
    this.options$.next({ header: header })
  };
  
    constructor(protected httpClient: HttpClient, protected auth: AuthService) {
    this.auth.options$.subscribe(o => this.options = o);
  }
  //get me va a devolver un observable: escucha y notifica a quien se subscribe,
  public get = (id?: number): Observable<T[] | T> => !id ? this.httpClient.get<T[]>(`${this.apiUrl}`, this.options)
    .pipe(map((entitys: any) => entitys.map((entity: T) => entity))) :
    //con pipe manipulo la peticion antes de hacer la devolucion del obj
    this.httpClient.get<T>(`${this.apiUrl}/${id}`, this.options).pipe(map((entity: any) => entity));
  //httpClient: cliente, hago un get a la url: url la obtengo de un archivo, en options capturo el observable y lo mepeo

  //edit update de una entidad, usa put, mapea y devuelve un observable
  public edit = (entity: T): Observable<T> => this.httpClient.put<T>(`${this.apiUrl}`, entity, this.options).pipe(map((e: any) => e));

  //add agrega una entidad, usa post, consume la url de un archivo, mapea la entidad y devuelve un observable
  public add = (entity: T): Observable<T> => this.httpClient.post<T>(`${this.apiUrl}`, entity, this.options).pipe(map((e: any) => e));
//delete eliminar una entidad, usa el id
  public delete = (id: number) => this.httpClient.delete<any>(`${this.apiUrl}/${id}`, this.options).pipe(map((e: any) => e));
}
