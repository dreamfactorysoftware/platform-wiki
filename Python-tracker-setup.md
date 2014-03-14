<a name="top" />

[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Python tracker**](Python-tracker-setup)

## Contents

- 1. [Overview](#overview)
- 2. [Integration options](#integration-options)
  - 2.1 [Tracker compatibility](#compatibility)
  - 2.2 [Dependencies](#dependencies)
- 3. [Setup](#setup)
  - 3.1 [PyPi](#pip)

<a name="overview" />
## 1. Overview

The [DreamFactory Python Tracker](https://github.com/dreamfactory/dreamfactory-python-tracker) lets you add analytics to your [Python] [python]-based applications.

The tracker should be relatively straightforward to setup if you are familiar with Python development.

Ready? Let's get started.

[Back to top](#top)

<a name="integration-options" />
## 2. Integration options

<a name="compatibility" />
### 2.1 Tracker compatibility

As a programming language that lets you work more quickly and integrate your systems more effectively, Python is available in a huge number of different computing environments and platforms, from Civilization IV through [Django framework] [django] to Ubuntu One.

To make the DreamFactory Python Tracker work out-of-the-box with as many different Python programs as possible, we have tried to:

1. Minimize external dependencies and third party libraries
2. Provide setup instructions

[Back to top](#top)

<a name="dependencies" />
### 2.2 Dependencies

To make the DreamFactory Python Tracker work with as many different Python programs as possible, we have tried to keep external dependencies to a minimum. There are only two external dependencies currently:

* [PyContracts] [pycontracts] - Python package that allows to declare constraints on function parameters and return values.
* [Requests] [requests] - HTTP library

These dependencies can be installed from the package manager of the host system or through PyPi.

[Back to top](#top)

<a name="setup" />
## 3. Setup

<a name="pip" />
### 3.1 PyPi

The DreamFactory Python Tracker is published to [PyPi] [pypi], the the official third-party software repository for the Python programming language.

This makes it easy to either install the tracker locally, or to add it as a dependency into your own Python app.

To install the DreamFactory Python Tracker locally (assuming you already have Pip installed):

    $ pip install dreamfactorytracker

To add the DreamFactory Tracker as a dependency to your own Python app, edit your `requirements.txt` and add:

```python
dreamfactorytracker ~> 0.0.1
```

Done? Now read the [Python Tracker API](Python-Tracker) to start tracking events.

[python]: http://www.python.org/

[django]: https://www.djangoproject.com/

[pycontracts]: https://pypi.python.org/pypi/PyContracts
[requests]: https://pypi.python.org/pypi/requests

[pypi]: https://pypi.python.org/