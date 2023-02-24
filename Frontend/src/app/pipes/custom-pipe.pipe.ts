// import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  
  transform(employees: any, filterString: string) {

    if (filterString.length === 0)
      return employees;

    const selected = new Set();

    if (filterString.includes(":")) {
      const data = filterString.split(':', 2);
      const column = data[0];
      const searchData = data[1];
      const amount = searchData.length;
      if (column === "salary") {
        for (const employee of employees) {
          const check = employee[column].toString().substring(0, amount);
          if (check === searchData)
            selected.add(employee);
        }
      } else if (column === "active") {
        for (const employee of employees) {
          const check = employee[column].toString().substring(0, amount);
          if (check === searchData)
            selected.add(employee);
        }
      }
    else {
          for (const employee of employees) {
            const check = employee[column].substring(0, amount);
            if (check.toLowerCase() === searchData.toLowerCase())
              selected.add(employee);
          } 
          let myArray = Array.from( selected );
          return myArray;
        }
      }

      //if no option was selected 
      for (const employee of employees) {
        const check = employee['firstName'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
      for (const employee of employees) {
        const check = employee['lastName'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
      for (const employee of employees) {
        const check = employee['email'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
      for (const employee of employees) {
        const check = employee["salary"].toString().substring(0, filterString.length);
        if (check === filterString)
          selected.add(employee);
      }
      for (const employee of employees) {
        const check = employee['job'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      } for (const employee of employees) {
        const check = employee['role'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
    for (const employee of employees) {
      const check = employee['active'].toString().substring(0, filterString.length);
      if (check === filterString.toLowerCase())
        selected.add(employee);
    }
    let myArray = Array.from( selected );
    return myArray;
    }
  }
