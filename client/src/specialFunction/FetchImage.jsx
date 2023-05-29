import React, {useEffect, useState} from 'react';
import {urlbook} from '../Appurl';
import {arrayBufferToBase64} from './BufferToBinary';

export default function FetchImage(props) {
  const {title, id} = props;
  const [image, getimage] = useState({
    load: false,
    contentType: '',
    img: {},
  });
  const fetchImage = () => {
    fetch(`${urlbook}/image`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        title: title,
        bookId: id,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res['status'] === 0) {
            getimage({
              ...image,
              load: true,
              contentType: 'res.image.contentType',
              img: arrayBufferToBase64(res.image.data.data),
            });
          } else {
            getimage({
              ...image,
              load: false,
            });
          }
        })
        .catch(
            (error) => {
              getimage({
                ...image,
                load: false,
              });
            },
        );
  };

  useEffect(() => {
    getimage({
      ...image,
      load: false,
    });
    fetchImage();
  }, [title, id]);

  return (
    <>
      {
        image.load ?
          <img alt='Server Error' src={`data:${image.contentType};base64,${image['img'].toString('base64')}`} width='100%' height={'100%'} /> :
          <div>Loading ...</div>
      }
    </>
  );
}
