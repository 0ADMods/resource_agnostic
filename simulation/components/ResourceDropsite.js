function ResourceDropsite() {}

ResourceDropsite.prototype.Schema =
	"<element name='Types'>" +
		"<text/>" +
	"</element>";


/**
 * Returns the list of resource types accepted by this dropsite.
 */
ResourceDropsite.prototype.GetTypes = function()
{
	var typesTok = ApplyValueModificationsToEntity("ResourceDropsite/Types", this.template.Types, this.entity);
	var typesArr = [];
	var resources = Resources.GetCodes();
	
	for (let type of typesTok.split(/\s+/))
		if (resources.indexOf(type.toLowerCase()) > -1)
			typesArr.push(type);

	return typesArr;
};

/**
 * Returns whether this dropsite accepts the given generic type of resource.
 */
ResourceDropsite.prototype.AcceptsType = function(type)
{
	return this.GetTypes().indexOf(type) != -1;
};

Engine.RegisterComponentType(IID_ResourceDropsite, "ResourceDropsite", ResourceDropsite);
