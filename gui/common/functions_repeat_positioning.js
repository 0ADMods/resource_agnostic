/*
	DESCRIPTION : Functions related to positioning UI elements
	NOTES       :
*/

/**
 * Horizontally spaces same-width objects repeated with the `<repeat>` tag
 * @param basename The base name of the object, such as "object[n]" or "object[a]_sub[b]"
 * @param splitvar The var identifying the repeat count, without the square brackets
 * @param margin The gap, in px, between the repeated objects
 * @return The number of elements affected
 */
function horizSpaceRepeatedObjects(basename, splitvar="n", margin=0)
{
	basename = basename.split("["+splitvar+"]", 2);
	var objObj = Engine.GetGUIObjectByName(basename.join("[0]"));
	var c = 0;
	while (objObj !== undefined)
	{
		let objSize = objObj.size;
		let objWidth = objSize.right - objSize.left;
		objSize.left = c * (objWidth + margin) + margin;
		objSize.right = ++c * (objWidth + margin);
		objObj.size = objSize;
		
		objObj = Engine.GetGUIObjectByName(basename.join("["+ c +"]"));
	}
	
	return c;
}

/**
 * Horizontally fit objects repeated with the `<repeat>` tag within a parent object
 * @param basename The base name of the object, such as "object[n]" or "object[a]_sub[b]"
 * @param splitvar The var identifying the repeat count, without the square brackets
 * @param margin The gap, in px, between the repeated objects
 * @param limit The number of elements to fit
 * @return The number of elements affected
 */
function horizFitRepeatedObjects(basename, splitvar="n", margin=0, limit=0)
{
	basename = basename.split("["+splitvar+"]", 2);

	var objObj;
	if (limit == 0)
		do
		{
			objObj = Engine.GetGUIObjectByName(basename.join("["+ ++limit +"]"));
		}
		while (objObj !== undefined)

	for (let c = 0; c < limit; ++c)
	{
		objObj = Engine.GetGUIObjectByName(basename.join("["+ c +"]"));
		let objSize = objObj.size;
		objSize.rleft = c * (100/limit);
		objSize.rright = (c+1) * (100/limit);
		objSize.right = -margin;
		objObj.size = objSize;
	}
	
	return limit;
}

/**
 * Vertically spaces same-height objects repeated with the `<repeat>` tag
 * @param basename The base name of the object, such as "object[n]" or "object[a]_sub[b]"
 * @param splitvar The var identifying the repeat count, without the square brackets
 * @param margin The gap, in px, between the repeated objects
 * @return The number of elements affected
 */
function vertiSpaceRepeatedObjects(basename, splitvar="n", margin=0)
{
	basename = basename.split("["+splitvar+"]", 2);
	var objObj = Engine.GetGUIObjectByName(basename.join("[0]"));
	var c = 0;
	while (objObj !== undefined)
	{
		let objSize = objObj.size;
		let objHeight = objSize.bottom - objSize.top;
		objSize.top = c * (objHeight + margin) + margin;
		objSize.bottom = ++c * (objHeight + margin);
		objObj.size = objSize;
		
		objObj = Engine.GetGUIObjectByName(basename.join("["+ c +"]"));
	}
	
	return c;
}

/**
 * Hide all repeated elements after a certain index
 * @param prefix The part of the element name preceeding the index
 * @param idx The index from which to start
 * @param prefix The part of the element name after the index
 */
function hideRemaining(prefix, idx, suffix)
{
	let obj = Engine.GetGUIObjectByName(prefix+idx+suffix);
	while (obj)
	{
		obj.hidden = true;
		++idx;
		obj = Engine.GetGUIObjectByName(prefix+idx+suffix);
	}
}
