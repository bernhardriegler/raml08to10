const transformer = require('api-spec-transformer');
const fs = require('fs');

const transformers = [
    {
        name: "swagger",
        type: "yaml",
        converter: new transformer.Converter(transformer.Formats.RAML08, transformer.Formats.SWAGGER)
    },
    // {
    //     name: "postman",
    //     type: "json",
    //     converter: new transformer.Converter(transformer.Formats.RAML08, transformer.Formats.POSTMAN)
    // },
    {
        name: "raml10",
        type: "yaml",
        converter: new transformer.Converter(transformer.Formats.RAML08, transformer.Formats.RAML10)
    },
]

transformers.map(transformer => {
    transformer.converter.loadFile('https://demo.getmesh.io/api/v1/raml', function (err) {
        if (err) {
            console.log(err.stack);
            return;
        }
        transformer.converter.convert(transformer.type)
            .then(function (convertedData) {
                fs.writeFileSync(`${__dirname}/gentics-mesh-api-${transformer.name}.yml`, convertedData);
                console.log(`${transformer.name} - done`);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
});