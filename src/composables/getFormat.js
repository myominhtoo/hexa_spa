

const getFormat = ( input , sign = "_" ) => {
   return input.split(sign).reduce( (prev,cur) => {
        prev += ` ${cur}`;
        return prev;
    } , "" );
}

export  default getFormat;