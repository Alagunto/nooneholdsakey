import json

class HandwritingExemplar:
  def __init__(self, phrase, events, name="", comment=""):
    self.phrase = phrase
    self.events = events
    self.name = name
    self.comment = comment
  
  def __str__(self):
    return json.dumps({
      "phrase": self.phrase,
      "events": self.events,
      "name": self.name,
      "comment": self.comment,
    })

  @staticmethod
  def fromString(string):
    data = json.loads(string)
    return HandwritingExemplar(
        data["phrase"],
        data["events"],
        data["name"] if "name" in data else "",
        data["comment"] if "comment" in data else ""
        )
