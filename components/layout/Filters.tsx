import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react'

export const Filters:FC = () => {

  const router = useRouter()


  let queryParams:any;

  if(typeof window !== 'undefined'){
    queryParams = new URLSearchParams(window.location.search)
  }


  useEffect(() => {

  }, [queryParams])



  const handlerClick = (checkbox:any) =>{//toma los valores rebidos por la funcion y los compara con los valores en el documento
                                          // sin son diferentes los elimina de URL queryParams y del docmuneto
    if(typeof window !== 'undefined'){
      const checkboxes = document.getElementsByName(checkbox.name)!

      checkboxes.forEach((item:any)=> {
        if (item!==checkbox) item.checked = false
      })
    }

    if(checkbox.checked ===false ){
      //eliminar el filtro del query
      if(queryParams.has(checkbox.name)){
        queryParams.delete(checkbox.name)
        router.replace({
          search:queryParams.toString()
        })

      }
    }else{
      if(queryParams.has(checkbox.name)){
        queryParams.set(checkbox.name, checkbox.value)
      }else {
        queryParams.append(checkbox.name, checkbox.value)
      }
      queryParams.delete('page')
      router.replace({
        search:queryParams.toString()
      })
    }



  }

  const checkHandler = (checkBoxType:string, checkBoxValue:string) => {// checheando los valores de url queryParams
    if(typeof window !== 'undefined'){
      const value = queryParams.get(checkBoxType)
      if (checkBoxValue ===value) return true
      return false
    }


  }



  return (
          <div className="sidebar mt-5">
            <h3>Filtros</h3>

            <hr />
            <h5 className="filter-heading mb-3">Tipo de trabajo</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="jobType"
                id="check1"
                value="Permanent"
                defaultChecked= {checkHandler('jobType',"Permanent")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check1">
                Permanente
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="jobType"
                id="check2"
                value="Temporary"
                defaultChecked= {checkHandler('jobType',"Temporary")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check2">
                Temporal
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="jobType"
                id="check3"
                value="Intership"
                defaultChecked= {checkHandler('jobType',"Intership")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check3">
                Pasantia
              </label>
            </div>

            <hr />
            <h5 className="mb-3">Educacion</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="education"
                id="check4"
                value="Bachelors"
                defaultChecked= {checkHandler('education',"Bachelors")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check4">
                Grado
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="education"
                id="check5"
                value="Masters"
                defaultChecked= {checkHandler('education',"Masters")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check5">
                Master
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="education"
                id="check6"
                value="Phd"
                defaultChecked= {checkHandler('education',"Phd")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check6">
                Phd
              </label>
            </div>

            <hr />

            <h5 className="mb-3">Experiencia</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="experience"
                id="check7"
                value="No Experience"
                defaultChecked= {checkHandler('experience',"No Experience")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check7">
                Sin experiencia
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="experience"
                id="check8"
                value="1 Years"
                defaultChecked= {checkHandler('experience',"1 Years")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check8">
                 1 Año
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="experience"
                id="check9"
                value="2 Years"
                defaultChecked= {checkHandler('experience',"2 Years")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check9">
                2 Años
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="experience"
                id="check10"
                value="3 Years above"
                defaultChecked= {checkHandler('experience',"3 Years above")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check10">
                3 Años+
              </label>
            </div>

            <hr />
            <h5 className="mb-3">Rango de salario</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="salary"
                id="check11"
                value="1-500000"
                defaultChecked= {checkHandler('salary',"1-500000")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check11">
                $1 - $500.000
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="salary"
                id="check12"
                value="500000-1000000"
                defaultChecked= {checkHandler('salary',"500000-1000000")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check12">
                $500.000 - $1.000.000
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="salary"
                id="check13"
                value="1000000-2000000"
                defaultChecked= {checkHandler('salary',"1000000-2000000")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check13">
                $1.000.000 - $2.000.000
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="salary"
                id="defaultCheck2"
                value="2000000-3000000"
                defaultChecked= {checkHandler('salary',"2000000-3000000")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                $2.000.000 - $3.000.000
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="salary"
                id="check14"
                value="3000000-5000000"
                defaultChecked= {checkHandler('salary',"3000000-5000000")!}
                onClick={({target})=>handlerClick(target)}
              />
              <label className="form-check-label" htmlFor="check14">
                $3.000.000 - $5.000.000
              </label>
            </div>

            <hr />
          </div>
        );
      };




export default Filters;