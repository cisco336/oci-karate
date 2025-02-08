'use client';
import { createPortal } from 'react-dom';
import CheckBox from '../CheckBox';
import { Button } from '../shared/Button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  getData,
  mutateData,
  userAgreedTerms,
} from '@/services/hygraph.service';
import { User } from 'next-auth';

export const TermsAgreement = () => {
  const { data: session, status } = useSession();
  const [checked, setChecked] = useState(false);

  console.log(session, status);

  const handleCheck = async (e: boolean) => {
    setChecked(e);
    try {
      const result = await mutateData<User>(userAgreedTerms, {
        id: (session as unknown as { id: string }).id,
        agreedTerms: e,
      });

      console.log('RESULT', result);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    status === 'authenticated' &&
    !(session as unknown as { agreedTerms: boolean }).agreedTerms &&
    createPortal(
      <div className="backdrop-filter backdrop-blur-sm fixed top-0 left-0 w-full h-full z-50 bg-opacity-90 flex items-center justify-center">
        <div className="max-w-[80vw] max-h-[80vh] bg-midnight-950 border-gradient flex flex-col">
          <h3 className="p-6 border-b border-b-midnight-900">Lorem ipsum</h3>
          <div className="p-6 overflow-auto">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              ullam soluta a odit, quasi quae quas laboriosam consectetur fugiat
              molestiae repellendus corrupti nisi iure commodi fugit sunt
              aliquam expedita nihil? Nisi, a nesciunt? Quibusdam quas atque
              iste ut accusamus obcaecati error voluptatem amet maiores aut quod
              deserunt unde maxime consectetur, ducimus earum eligendi id
              nostrum doloribus! Consectetur est velit quisquam. Expedita eos
              dolor dolores beatae cum dolorum voluptatibus, et quo corrupti,
              blanditiis officia tempore illum optio labore possimus iure qui
              ullam eum dolore ad rem dolorem? Sunt ea vero reiciendis. Nihil
              porro voluptates excepturi, est ipsam quo dolorum? Expedita vero
              nam minima voluptates. Architecto ullam atque assumenda velit cum
              quam, perspiciatis alias quo beatae, aliquid ratione est dolores
              cumque error? Voluptate fuga sapiente, tempore facere voluptatem
              nemo pariatur in accusamus vero totam fugiat ducimus autem quam
              repellendus necessitatibus dolorem officiis eligendi commodi.
              Natus molestias nesciunt dignissimos minima culpa sapiente maxime.
              Ratione labore dolores similique dolorem officia qui numquam
              veritatis quidem doloribus nobis expedita, aspernatur facere
              reiciendis maxime repellat obcaecati debitis cumque repellendus
              laborum. Nobis enim corrupti obcaecati, veniam dolores commodi.
              Provident, praesentium vel eos aspernatur asperiores, architecto
              labore excepturi neque iure beatae repellat quas nam, placeat
              quaerat. Deleniti sunt earum illo temporibus molestias rem fugiat!
              Repudiandae totam eum commodi natus! Amet quisquam adipisci id
              fugit laudantium placeat asperiores eius. Adipisci autem qui
              voluptas ad. Rerum, cupiditate? Commodi, quia accusantium! Omnis
              at quasi ut esse ab provident aliquid quod sit obcaecati! Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Deleniti ullam
              soluta a odit, quasi quae quas laboriosam consectetur fugiat
              molestiae repellendus corrupti nisi iure commodi fugit sunt
              aliquam expedita nihil? Nisi, a nesciunt? Quibusdam quas atque
              iste ut accusamus obcaecati error voluptatem amet maiores aut quod
              deserunt unde maxime consectetur, ducimus earum eligendi id
              nostrum doloribus! Consectetur est velit quisquam. Expedita eos
              dolor dolores beatae cum dolorum voluptatibus, et quo corrupti,
              blanditiis officia tempore illum optio labore possimus iure qui
              ullam eum dolore ad rem dolorem? Sunt ea vero reiciendis. Nihil
              porro voluptates excepturi, est ipsam quo dolorum? Expedita vero
              nam minima voluptates. Architecto ullam atque assumenda velit cum
              quam, perspiciatis alias quo beatae, aliquid ratione est dolores
              cumque error? Voluptate fuga sapiente, tempore facere voluptatem
              nemo pariatur in accusamus vero totam fugiat ducimus autem quam
              repellendus necessitatibus dolorem officiis eligendi commodi.
              Natus molestias nesciunt dignissimos minima culpa sapiente maxime.
              Ratione labore dolores similique dolorem officia qui numquam
              veritatis quidem doloribus nobis expedita, aspernatur facere
              reiciendis maxime repellat obcaecati debitis cumque repellendus
              laborum. Nobis enim corrupti obcaecati, veniam dolores commodi.
              Provident, praesentium vel eos aspernatur asperiores, architecto
              labore excepturi neque iure beatae repellat quas nam, placeat
              quaerat. Deleniti sunt earum illo temporibus molestias rem fugiat!
              Repudiandae totam eum commodi natus! Amet quisquam adipisci id
              fugit laudantium placeat asperiores eius. Adipisci autem qui
              voluptas ad. Rerum, cupiditate? Commodi, quia accusantium! Omnis
              at quasi ut esse ab provident aliquid quod sit obcaecati! Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Deleniti ullam
              soluta a odit, quasi quae quas laboriosam consectetur fugiat
              molestiae repellendus corrupti nisi iure commodi fugit sunt
              aliquam expedita nihil? Nisi, a nesciunt? Quibusdam quas atque
              iste ut accusamus obcaecati error voluptatem amet maiores aut quod
              deserunt unde maxime consectetur, ducimus earum eligendi id
              nostrum doloribus! Consectetur est velit quisquam. Expedita eos
              dolor dolores beatae cum dolorum voluptatibus, et quo corrupti,
              blanditiis officia tempore illum optio labore possimus iure qui
              ullam eum dolore ad rem dolorem? Sunt ea vero reiciendis. Nihil
              porro voluptates excepturi, est ipsam quo dolorum? Expedita vero
              nam minima voluptates. Architecto ullam atque assumenda velit cum
              quam, perspiciatis alias quo beatae, aliquid ratione est dolores
              cumque error? Voluptate fuga sapiente, tempore facere voluptatem
              nemo pariatur in accusamus vero totam fugiat ducimus autem quam
              repellendus necessitatibus dolorem officiis eligendi commodi.
              Natus molestias nesciunt dignissimos minima culpa sapiente maxime.
              Ratione labore dolores similique dolorem officia qui numquam
              veritatis quidem doloribus nobis expedita, aspernatur facere
              reiciendis maxime repellat obcaecati debitis cumque repellendus
              laborum. Nobis enim corrupti obcaecati, veniam dolores commodi.
              Provident, praesentium vel eos aspernatur asperiores, architecto
              labore excepturi neque iure beatae repellat quas nam, placeat
              quaerat. Deleniti sunt earum illo temporibus molestias rem fugiat!
              Repudiandae totam eum commodi natus! Amet quisquam adipisci id
              fugit laudantium placeat asperiores eius. Adipisci autem qui
              voluptas ad. Rerum, cupiditate? Commodi, quia accusantium! Omnis
              at quasi ut esse ab provident aliquid quod sit obcaecati!
            </p>
            <div className="py-4 flex flex-col gap-2 items-end">
              <CheckBox
                callback={handleCheck}
                title="Estoy de acuerdo con los terminos y condiciones"
              />
              <Button disabled={!checked}>Continuar</Button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};
