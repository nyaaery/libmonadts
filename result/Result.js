const result_impl_constructor = class Result {
    match(block) {
        if ("_" in block) {
            if (block.Ok !== undefined && this.Ok()) {
                return block.Ok(this.value);
            }
            else if (block.Err !== undefined && this.Err()) {
                return block.Err(this.value);
            }
            else {
                return block._();
            }
        }
        else {
            if (this.Ok()) {
                return block.Ok(this.value);
            }
            else {
                return block.Err(this.value);
            }
        }
    }
    bind(f) {
        if (this.Ok()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
};
const ok_impl_constructor = class Ok extends result_impl_constructor {
    Ok() {
        return true;
    }
    Err() {
        return false;
    }
};
const err_impl_constructor = class Err extends result_impl_constructor {
    Ok() {
        return false;
    }
    Err() {
        return true;
    }
};
const ok_impl = new ok_impl_constructor();
const err_impl = new err_impl_constructor();
export function Ok(value) {
    const ok = Object.create(ok_impl);
    ok.value = value;
    return ok;
}
export function Err(value) {
    const err = Object.create(err_impl);
    err.value = value;
    return err;
}
export function Result(f) {
    try {
        return Ok(f());
    }
    catch (err) {
        return Err(err);
    }
}
