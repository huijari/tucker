# tucker
A system for building c-mera apps

## Getting Started
### Prerequisites
You will need node, npm and [c-mera](https://github.com/kiselgra/c-mera) to run tucker.
Also, you will probably need an unix environment, with at least `find` and `xargs`.

### Installing
Install the [package](https://www.npmjs.com/package/tucker) from npm:
```sh
npm install -g tucker
```

### Running
First you need to create a new project:
```sh
mkdir hello_world
cd hello_world
tucker init
```

The cli will ask some basic info to fill the metadata at `tucker.json`.
After that you can compile the project with `tucker build` or run it directly with `tucker run`.

## Notice
The `c` target is the most supported one, with a lot of missing implementation for others targets. 

## Contributing
Feel free to fill issues reporting bugs or sugesting ideas.

## Authors
* **Alexandre Cesar** - *Initial work* - [huijari](https://github.com/huijari)

See also the list of [contributors](https://github.com/huijari/tucker/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
