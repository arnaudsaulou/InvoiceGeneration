Question 1: About input validation:

How fastify processes unknown properties?
    It accept it if additionalProperties is not set to false 

How fastify behaves if a known property is missing in the payload?
    It's ok if the property is not requiered, else an error will be throw 

What happens if an input property is null?
    It's ok if the property accept null, else an error will be throw



Question 2: About response serialisation:

How fastify processes unknown properties?
    The property will nor be serialized

How fastify behaves if a known property is missing in the payload?
    It's ok if the property is not requiered, else an error will be throw 



Question 3: Is input validation just a matter of types and schemae?
    No, it is also about formatting, security, ...

