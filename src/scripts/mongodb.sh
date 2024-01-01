use heroes

db.heroes.create({ name: 'any_name', power: 'any_power'})

db.heroes.find({})

db.heroes.update({_id: id}, {$set: {name: 'updated_name'}})

db.heroes.delete({_id: id})
