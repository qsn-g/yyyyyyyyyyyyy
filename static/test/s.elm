module Bootstrap.Select exposing (..)

import Html exposing (Html)
import Html.Attributes exposing (attribute)
import Bootstrap.Dropdown as Dropdown


-- MODEL
type alias Model a =
  { value: a
  , options: List a
  , open: Bool
  }
init : List a -> a -> Model a
init options value =
  { value = value
  , options = options
  , open = False
  }
value : Model a -> a
value model = model.value

set : a -> Model a -> Model a
set value model = { model | value = value }

-- UPDATE
type Action a = Select a | Toggle Bool
update : Action a -> Model a -> Model a
update action model =
  case action of
    Select a ->
      { model | value = a, open = False }
    Toggle open ->
      { model | open = open }


-- VIEW
view : (a -> Html) -> String -> Signal.Address (Action a) -> Model a -> Html
view render = view' render render

view' : (a -> Html) -> (a -> Html) -> String -> Signal.Address (Action a) -> Model a -> Html
view' renderValue renderItem class address model =
  let
    button = Dropdown.button
      Html.button [Html.Attributes.attribute "class" class, Html.Attributes.attribute "type" "button"] [
        renderValue model.value, Html.text " ", Html.span [Html.Attributes.attribute "class" "caret"] []
      ]
    mapOption o = Dropdown.ItemHtml (Select o) (renderItem o)
    items = List.map mapOption model.options
  in
    Dropdown.viewFor Toggle button items address model.open
