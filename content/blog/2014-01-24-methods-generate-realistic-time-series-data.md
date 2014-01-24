---
title: "Generating Realistic Time Series Data"
date: "2014-01-24"
url: /blog/2014/01/24/methods-generate-realistic-time-series-data/
categories:
  - Programming
  - Monitoring
---
I am interested in compiling a list of techniques to generate fake time-series
data that looks and behaves realistically. The goal is to make a mock API for
developers to work against, without needing bulky sets of real data, which are
annoying to deal with, especially as things change and new types of data are
needed.

To achieve this, I think several specific things need to be addressed:

1. What common classes or categories of time-series data are there? For example,
   * cyclical (ex: traffic to a web server day-over-day)
   * apparently random (ex: stock ticker)
   * generally increasing (ex: stock ticker for an index)
   * exponentially decaying (ex: unix load average)
	* usually zero, with occasional nonzero values (ex: rainfall in a specific location)
2. What parameters describe the data's behavior? Examples might include an
	exponential decay, periodicity, distribution of values, distribution of
	intervals between peaks, etc.
3. What techniques can be used to deterministically generate data that
	approximates a given category of time-series data, so that one can generate
	mock sources of data without storing real examples? For a simplistic example,
	you could seed a random number generator for determinism, and use something
	like `y_n = rand() * 10 + 100` for data that fluctuates randomly between 90 and
	100.

To make the mock API, I imagine we could catalog a set of metrics we want to
be able to generate, with the following properties for each:

* name
* type
* dimensions
* parameters
* random seed or other initializer

This reduces the problem from what we currently do (keeping entire data sets,
which need to be replaced as our data gathering techniques evolve) into just a
dictionary of metrics and their definitions.

Then the mock API would accept requests for a set of metrics, the time range
desired, and the resolution desired. The metrics would be computed and returned.

To make this work correctly, the metrics need to be generated deterministically.
That is, if I ask for metrics from 5am to 6am on a particular day, I should
always get the same values for the metrics. And if I ask for a different time
range, I'd get different values. What this means, in my opinion, is that there
needs to be a closed-form function that produces the metric's output for a given
timestamp. (I think one-second resolution of data is fine enough for most
purposes.)

Does anyone have suggestions for how to do this?

The result will be open-sourced, so everyone who's interested in such a
programmatically generated dataset can benefit from it.
