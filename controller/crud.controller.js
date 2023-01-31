
const get = ( model ) => async ( req, res ) => {
    try {
        let data = await model.find();
        res.send({
            success: true,
            data: data
        })
    } catch ( err ) {
        console.log( err );
    }
}

const post = ( model ) => async ( req, res ) => {
    try {
        let result = await model.create( req.body );
        res.send({
            success: true,
            data: result
        })
    } catch ( err ) {
        console.log( err );
    }
}

module.exports = function( model ) {
    return {
        get : get( model ),
        post : post( model )
    }
}