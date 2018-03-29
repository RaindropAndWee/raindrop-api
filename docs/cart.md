## Cart Actions

All carts action requests must include a valid HTTP header `Authorization: Token
 token=<token>` or they will be rejected with a status of 401 Unauthorized.

All of the cart actions follow the *RESTful* style.

Carts are associated with users, `_owner`.
All actions will only retrieve a cart if the user associated
 with the `Authorization` header matches the cart's `_owner`.
If this requirement is unmet, the response will be 404 Not Found, except for
 the index action which will return an empty carts array.

The data in the `goblin_state` and `player_state` columns of the database are
  stored as text. To extract the necessary data from them, simply run the string
  through JSON.parse, and it will be converted to a JavaScript object.

*Summary:*

<table>
<tr>
  <th colspan="3">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>GET</td>
<td>`/carts`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>carts found</strong></td>
</tr>
<tr>
  <td colspan="3">
  The default is to retrieve all carts associated with the user..
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/carts`</td>
<td>n/a</td>
<td>201, Created</td>
<td><strong>cart created</strong></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
<td>GET</td>
<td>`/carts/:id`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>cart found</strong</td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/carts/:id`</td>
<td><strong>cart delta</strong></td>
<td>200, OK</td>
<td><strong>cart updated</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>DELETE</td>
<td>`/carts/:id`</td>
<td>n/a</td>
<td>204, No Content</td>
<td><strong>cart deleted</strong</td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
</table>

### index

The `index` action is a *GET* that retrieves all the carts associated with a
 user.
The response body will contain JSON containing an array of carts

If there are no carts associated with the user, the response body will contain
 an empty carts array, e.g.:

```json
{
  "carts": [
  ]
}
```

### create

The `create` action expects a *POST* with a body containing a Purchased value and
a cartProducts array.
If the request is successful, the response will have an HTTP Status of 201
 Created, and the body will contain JSON of the created cart with `_owner` set
to the user calling `create` e.g.:

```json
'{
  "cart": {
    "purchased": "'"false"'",
    "cartProducts": [
    "w7etf87zdyfaw9e8yfaw"
    ]
  }
}'
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.

### show

The `show` action is a *GET* specifing the `id` of the cart to retrieve.
If the request is successful the status will be 200, OK, and the response body
 will contain JSON for the cart requested.

### update

#### update a cart's states

This `update` action expects a *PATCH* with changes to to an existing cart.
The `update` action expects data formatted as such:
```json
'{
  "cart": {
    "purchased": "'"false"'",
    "cartProducts": [
    "w7etf87zdyfaw9e8yfaw",
    "qwe7ftr89e7raotfgwef"
    ]
  }
}'
```

If the request is successful, the response will have an HTTP Status of 200 OK,
 and the body will be empty.

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.
