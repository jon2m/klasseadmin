module.exports = async function (context, req) {
    context.res = {
        body: {
            text: "Hej fra API"

        }
    };
};