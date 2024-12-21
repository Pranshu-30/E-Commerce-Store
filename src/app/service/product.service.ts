
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private graphqlUrl = 'https://api.escuelajs.co/graphql';

  constructor(private http: HttpClient) { }


  addProduct(data: { title: string; price: number; description: string; categoryId: number; images: string[] }): Observable<any> {
    const mutation = {
      query: `
        mutation ($data: CreateProductDto!) {
          addProduct(data: $data) {
            id
            title
            description
            price
            images
            category {
              id
              name
            }
          }
        }
      `,
      variables: { data },
    };

    return this.http.post<any>(this.graphqlUrl, mutation);
  }


  getProductsByCategory(categoryId: string): Observable<any> {
    const query = {
      query: `
        query ($categoryId: Float!) {
          products(categoryId: $categoryId) {
            id
            title
            description
            price
            images
          }
        }
      `,
      variables: { categoryId: parseFloat(categoryId) },
    };
    return this.http.post<any>(this.graphqlUrl, query);
  }
}
