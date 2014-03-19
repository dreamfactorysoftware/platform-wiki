As part of our commitment to a loosely-coupled architecture for the platform, where possible we extract DSP functionality into standalone code components and libraries, which you can use in your own software development - even if you're not using the DreamFactory Services Platform&trade;.

We publish these code components and libraries to the following artifact repositories:

1. **[Packagist.org] [packagist]** - for all libraries

To take each in turn:

## Packagist.org

Packagist.org is the PHP community's package hosting service. You can find all of our published libraries listed under [our dreamfactory username] [packagist-dreamfactory].

### Available libraries

Current libraries are:

### Using in your project

Add an appropriate line to your application's composer.json, for example, to use the [Oasys] [dreamfactory-oasys] library:

```
"require": {
	"dreamfactory/oasys": "*"
}
```

And then execute:

    $ composer update

## See also

[packagist]: https://packagist.org/
[dreamfactory-oasys]: https://packagist.org/dreamfactory/oasys
[packagist-dreamfactory]: https://packagist.org/dreamfactory/