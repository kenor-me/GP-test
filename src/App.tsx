import { useEffect, useState } from 'react';
import { Preloader, Table } from './components';
import { getVegansBook } from './api';
import { TEatObj, TDietObj } from './types';
import { getWhoEatPizza } from './functions/getWhoEatPizza';

export const App = (): JSX.Element => {
  const [resultList, setResultList] = useState<{
    totalPeople: never[] | TEatObj[];
    eatPizza: never[] | TEatObj[];
    dietBook: never[] | TDietObj[];
    complete: boolean;
    pending: boolean;
    error: boolean;
  }>({
    totalPeople: [],
    eatPizza: [],
    dietBook: [],
    complete: false,
    pending: false,
    error: false,
  });
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setResultList({
      totalPeople: [],
      eatPizza: [],
      dietBook: [],
      pending: true,
      error: false,
      complete: false,
    });
    if (localStorage.getItem('partyList')) {
      const isLocal = JSON.parse(localStorage.getItem('partyList') as string);
      setResultList({
        totalPeople: isLocal.totalPeople,
        eatPizza: isLocal.eatPizza,
        dietBook: isLocal.dietBook,
        pending: false,
        error: false,
        complete: true,
      });
    } else {
      fetch('https://gp-js-test.herokuapp.com/pizza')
        .then((response) => response.json())
        .then((data: { party: [] }): void => {
          const totalPeople: TEatObj[] = data.party;
          const eatPizza: TEatObj[] = getWhoEatPizza(totalPeople);

          const bookNames: string = eatPizza
            .map((item) => item.name.split(' ').join('%20'))
            .join(',');

          getVegansBook(bookNames)
            .then((responseDiet: { diet: TDietObj[] }): void => {
              setResultList({
                totalPeople: data.party,
                eatPizza: eatPizza,
                dietBook: responseDiet.diet,
                pending: false,
                error: false,
                complete: true,
              });
              setLoad(false);
            })
            .catch((error): void => {
              console.log(error);
            });
        })
        .catch((error): void => {
          setResultList({
            totalPeople: [],
            eatPizza: [],
            dietBook: [],
            pending: false,
            error: true,
            complete: true,
          });
          console.log(error);
        });
    }
  }, [load]);

  useEffect((): void => {
    localStorage.setItem('partyList', JSON.stringify(resultList));
  }, [resultList]);

  return (
    <div>
      {resultList.pending && <Preloader />}
      {resultList.complete && <Table resultList={resultList} setLoad={setLoad} />}
    </div>
  );
};
